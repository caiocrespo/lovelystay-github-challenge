
# Lovelystay github challenge

A project about pulling data from github API and storing it in a Postgresql as requested for a challenge to test coding skills.

## Installation

Use the node package manager, or just use your favorite (Yarn, Bun, etc...)

```bash
npm install
```

## Env configuration

Make sure you configure the __.env__ file correctly to connect to postgresql on your local machine.

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=123456
DB_PORT=5432
```

## Migrations

The project has migrations config to get the database started. You should run the migrations configs by using the command:

```bash
npx ts-node src/db/migrations/01_create_tables.ts
```

## Usage
The project is expected to have the following functions:

1. Fetch information about a given GitHub user, and store it on one or more database tables; It can be done by using the following command (Replace USERNAME with the user you want to fetch):

```bash
npx ts-node src/index.ts collect {USERNAME}
```

2. Fetch and display all users already on the database. It can be done by using the following command line:

```bash
npx ts-node src/index.ts fetch
```

3. It should also list users only from a given location. On the following command replace VALUE with the expected filter location:

```bash
npx ts-node src/index.ts fetch location={VALUE}
```

4. Finally, the application can also query the programming languages this user seems to know/have repositories with, and store them on the database as well - allowing to query a user per location and/or programming languages:

```bash
npx ts-node src/index.ts fetch language={VALUE}
```
You can input the language name (Name Approximation) or use the language ID to be exact. You can also combine both params to filter together: 

```bash
npx ts-node src/index.ts fetch language={VALUE} location={VALUE}
```

> [!NOTE]
> You can switch between OR and AND operators by adding the operation=AND

## Testing

There's also a unit test implementation available via jest. You can run the test with the following command:

```bash
npm run test
```

## Project Structure

```
project-root/
│
├── src/                              # Source code directory
│   ├── commands/                     # Methods Implementation
│   │   ├── collectUsers.ts           # Methods to collect user data
│   │   └── fetchUsers.ts             # Command to display collected data
│   │   
│   │
│   ├── db/                           # Database-related modules
│   │   ├── migrations/               # Database migration files
│   │   │   └── 01_create_tables.ts   # Migration file to create the users table
│   │   │
│   │   ├── models/                   # Data Modeling
│   │   │   └── index.ts              # Data Modeling file
│   │   │
│   │   └── index.ts                  # Database initialization and connection
│   │
│   └── utils/                        # Utility modules
│       └── githubClient.ts           # API client for fetching github API
│
├── tests/                            # Test directory
│   └── fetchUsersByPartialString.test.ts
│
├── .env                              # Environment variable configuration file
├── .gitignore                        # Git ignore file
├── package.json                      # Node.js package configuration file
├── tsconfig.json                     # TypeScript compiler configuration file
└── README.md                         # Project documentation
```

## Features

- [x]  You must use NodeJS, TypeScript, and PostgreSQL;
- [x]  You should setup the database using migrations, if possible (preferably using SQL, but not mandatory) - feel free to use external tools or libraries for this purpose;
- [x]  Code should be split into database functions and general processing functions, when possible;
- [x]  For database access, you must use this library: https://github.com/vitaly-t/pg-promise
- [x]  For the processing (business logic) functions you should use either native ES6 functions or the library https://ramdajs.com/docs/ (or both);
- [x]  All async functions must be composable, meaning you can call them in sequence without asynchronicity issues;
- [x]  You shall have one main function and you should avoid process.exit() calls to the bare minimum;
- [x]  You must not use classes, as it is not justified for such a small app (we use almost no classes on our code);
- [x]  Your code must be safe, assume all input strings as insecure and avoid SQL injections;
- [x]  Each line shall not exceed 80 characters (bonus points if you include/follow some eslint rules), and it should use 2 spaces instead of tabs;
- [x]  Your code must be uploaded to GitHub, GitLab, or bitbucket, and you shall present it as a Pull Request over your very first commit;
- [x]  And finally, very important, don't forget to include a proper ReadMe.md, that documents your application and tells us how to use it.
- [x]  Also, bonus points if you include relevant tests on your submission.

