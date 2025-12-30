```

   SSSSSSSSSSSSSSS EEEEEEEEEEEEEEEEEEEEEEDDDDDDDDDDDDD
 SS:::::::::::::::SE::::::::::::::::::::ED::::::::::::DDD
S:::::SSSSSS::::::SE::::::::::::::::::::ED:::::::::::::::DD
S:::::S     SSSSSSSEE::::::EEEEEEEEE::::EDDD:::::DDDDD:::::D
S:::::S              E:::::E       EEEEEE  D:::::D    D:::::D
S:::::S              E:::::E               D:::::D     D:::::D
 S::::SSSS           E::::::EEEEEEEEEE     D:::::D     D:::::D
  SS::::::SSSSS      E:::::::::::::::E     D:::::D     D:::::D
    SSS::::::::SS    E:::::::::::::::E     D:::::D     D:::::D
       SSSSSS::::S   E::::::EEEEEEEEEE     D:::::D     D:::::D
            S:::::S  E:::::E               D:::::D     D:::::D
            S:::::S  E:::::E       EEEEEE  D:::::D    D:::::D
SSSSSSS     S:::::SEE::::::EEEEEEEE:::::EDDD:::::DDDDD:::::D
S::::::SSSSSS:::::SE::::::::::::::::::::ED:::::::::::::::DD
S:::::::::::::::SS E::::::::::::::::::::ED::::::::::::DDD
 SSSSSSSSSSSSSSS   EEEEEEEEEEEEEEEEEEEEEEDDDDDDDDDDDDD

```

# What is this?

This is a small script that goes through the list of your Substack email subscribers and creates a distribution table for the domain names.

☑️ No dependency. Uses Node's native CVS parser
☑️ Easy to audit: just one file
☑️ Works directly from the command line. No need to clone the repo.

## Why does this exist?

This helps get an understanding of where your subcribers are. The interesting data is in the long tail of 1-2 subs from domains like `amazon.com` or `microsoft.com`.

In the age of AI, do we really need a script like this? I'd argue yes for 2 reasons:

1. Subscriber email address is PII (personally identifiable information) and they'll be thankful if this info isn't shared with some cloud AI provider

2. Using AI for such a simple task is like using a machine gun to kill a mosquito! This script can handle millions of records because it only processes one line at a time.

Since the output is scraped from PII, you can feed it to AI. As a bonus, the output of this script burns much less tokens because it aggregates multiple users from the same domain.

## How to use it?

You need to have [Node.js](https://nodejs.org/) installed.

Go to Substack Dasbhboard and export all subscribers then run the following command:

```bash
npx -format table substack-email-distribution path/to/file.csv
```

[`npx`](https://docs.npmjs.com/cli/v8/commands/npx) is part of Node.js which is available out of the box.

_Tip: the result can be quite long. You may want to forward the output to a file by appending this to your command: `> myfile.txt`_

You can also specify a format with `--format` or `-f` which can be:

- `table`: (default)
- `json`: json object where key is the email domain and value is the frequency of that domain
- `csv`: comma separated values (for for spreadsheets, but if you're proficient in spreadsheets you probably don't need this script!)
- `tsv`: tab separated values (good for bash processing)

The full list of options can be seen using `-h` option.

### `--format table`:

```
┌───────────────────────────────────┬───────┐
│ (index)                           │ Count │
├───────────────────────────────────┼───────┤
│ gmail.com                         │ 13069 │
│ hotmail.com                       │ 335   │
│ yahoo.com                         │ 268   │
│ outlook.com                       │ 221   │
│ icloud.com                        │ 209   │
...
```

### `--format json`:

```json
{
  "gmail.com": 13069,
  "hotmail.com": 335,
  "yahoo.com": 268,
  "outlook.com": 221,
  "icloud.com": 209,
  ...
```

### `--format csv`:

```csv
gmail.com,13069
hotmail.com,335
yahoo.com,268
outlook.com,221
icloud.com,209
...
```

### `--format tsv`:

```tsv
gmail.com	13069
hotmail.com	335
yahoo.com	268
outlook.com	221
icloud.com	209
...
```

# Requirement

Node v24+.
