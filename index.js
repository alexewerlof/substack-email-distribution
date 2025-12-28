#!/usr/bin/env node
import { parseArgs } from 'util'
import fs from 'fs'
import readline from 'readline'

const DEFAULT_FORMAT = 'table'

export async function parseEmails(csvFilename) {
    await fs.promises.access(csvFilename)
    const fileStream = fs.createReadStream(csvFilename)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const lines = rl[Symbol.asyncIterator]()
    const headerResult = await lines.next()

    if (headerResult.done) {
        throw new Error('Error: CSV file is empty.')
    }

    const headers = headerResult.value.split(',')
    // Find the column named 'Email' (case-sensitive matching Substack's default)
    const emailIndex = headers.findIndex((h) => h.trim() === 'Email')

    if (emailIndex === -1) {
        throw new Error('Error: "Email" column not found in CSV headers.')
    }

    const ret = []

    for await (const line of lines) {
        // Simple split by comma. Note: This does not handle commas inside quoted fields.
        const columns = line.split(',')

        if (columns[emailIndex]) {
            ret.push(columns[emailIndex].trim())
        }
    }

    return ret
}

export function getDomain(email) {
    return email.split('@')[1].toLowerCase()
}

function sortByCountAndDomain([domainA, countA], [domainB, countB]) {
    if (countA === countB) {
        return domainA.localeCompare(domainB)
    }
    return countB - countA
}

function getDomainCounts(emails) {
    const ret = Object.create(null)

    for (const email of emails) {
        const domain = getDomain(email)
        if (!(domain in ret)) {
            ret[domain] = 0
        }
        ret[domain]++
    }

    return ret
}

function sortDomainCounts(domainCounts) {
    return Object.entries(domainCounts).sort(sortByCountAndDomain)
}

function print(domainCounts, format = DEFAULT_FORMAT) {
    switch (format.toLowerCase()) {
        case 'json':
            console.log(JSON.stringify(Object.fromEntries(domainCounts), null, 2))
            break
        case 'csv':
            console.log('Domain,Count')
            domainCounts.forEach(([domain, count]) => console.log(`${domain},${count}`))
            break
        case 'tsv':
            console.log('Domain\tCount')
            domainCounts.forEach(([domain, count]) => console.log(`${domain}\t${count}`))
            break
        case 'table':
            console.table(Object.fromEntries(domainCounts.map(([domain, count]) => [domain, { Count: count }])))
            break
        default:
            throw new Error(`Unknown format: ${format}`)
    }
}

async function main() {
    const { values, positionals } = parseArgs({
        options: {
            format: {
                type: 'string',
                short: 'f',
                default: DEFAULT_FORMAT,
            },
            help: {
                type: 'boolean',
                short: 'h',
            },
        },
        allowPositionals: true,
    })

    if (values.help) {
        console.log(
            [
                'Usage: substack-email-distribution [options] <file>',
                '',
                'Options:',
                '  -f, --format <type>  Output format (table, json, csv, tsv) [default: table]',
                '  -h, --help           Show this help message',
            ].join('\n'),
        )
        process.exit(0)
    }

    const emails = await parseEmails(positionals[0])
    const sortedDomainCounts = sortDomainCounts(getDomainCounts(emails))

    print(sortedDomainCounts, values.format)
}

main().catch(console.error)
