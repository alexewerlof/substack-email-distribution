#!/usr/bin/env node
import { parseArgs } from 'util';
import fs from 'fs';
import readline from 'readline';

export async function parseEmails(csvFilename) {
  await fs.promises.access(csvFilename);
  const fileStream = fs.createReadStream(csvFilename);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = rl[Symbol.asyncIterator]();
  const headerResult = await lines.next();

  if (headerResult.done) {
    throw new Error('Error: CSV file is empty.');
  }

  const headers = headerResult.value.split(',');
  // Find the column named 'Email' (case-sensitive matching Substack's default)
  const emailIndex = headers.findIndex((h) => h.trim() === 'Email');

  if (emailIndex === -1) {
    throw new Error('Error: "Email" column not found in CSV headers.');
  }

  const ret = []

  for await (const line of lines) {
    // Simple split by comma. Note: This does not handle commas inside quoted fields.
    const columns = line.split(',');

    if (columns[emailIndex]) {
      ret.push(columns[emailIndex].trim());
    }
  }

  return ret;
}

export function getDomain(email) {
  return email.split('@')[1].toLowerCase();
}

function sortByCountAndDomain([domainA, countA], [domainB, countB]) {
  if (countA === countB) {
    return domainA.localeCompare(domainB);
  }
  return countB - countA
}

function getDomainCounts(emails) {
  const ret = Object.create(null)
  
  for (const email of emails) {
    const domain = getDomain(email);
    if (!(domain in ret)) {
        ret[domain] = 0;
    }
    ret[domain]++;
  }

  return ret;
}

function sortDomainCounts(domainCounts) {
  return Object.entries(domainCounts).sort(sortByCountAndDomain);
}

async function main() {
  const { values, positionals } = parseArgs({
    options: {
      format: {
        type: 'string',
        short: 'f',
        default: 'table',
      },
    },
    allowPositionals: true,
  });

  const emails = await parseEmails(positionals[0]);
  const sortedDomainCounts = sortDomainCounts(getDomainCounts(emails));

  if (values.format === 'json') {
    console.log(JSON.stringify(Object.fromEntries(sortedDomainCounts), null, 2));
  } else {
    console.table(Object.fromEntries(sortedDomainCounts.map(([domain, count]) => [domain, { Count: count }])));
    console.log(`Total: ${emails.length}`);
  }
}

main().catch(console.error);
