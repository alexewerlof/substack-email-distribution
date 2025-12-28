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

## How to use it?

Go to Substack Dasbhboard and export all subscribers then move the CSV to the same folder as this script.

Directly from NPM:

```bash
npx substack-email-distribution path/to/file.csv
```

If you have cloned the repo:

```bash
node index.js path/to/file.csv
```

This prints out a sorted email domain list by number of emails from that domain like this:

```
┌───────────────────────────────────┬───────┐
│ (index)                           │ Count │
├───────────────────────────────────┼───────┤
│ gmail.com                         │ 13069 │
│ hotmail.com                       │ 335   │
│ yahoo.com                         │ 268   │
│ outlook.com                       │ 221   │
│ icloud.com                        │ 209   │
│ live.com                          │ 41    │
│ me.com                            │ 38    │
│ duck.com                          │ 38    │
...
...
│ alexewerlof.com                   │ 1     │
└───────────────────────────────────┴───────┘
Total: 17085
```

The file can be long so you may want to forward the output to a file:

```bash
node index.js CSV_FILE_NAME > output.txt
```

# Requirement

Node v24+.
