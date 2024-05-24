import { collectUsers } from './commands/collectUsers';
import { fetchUsers } from './commands/fetchUsers';

const args = process.argv.slice(2);

const main = async () => {
    switch (args[0]) {
        case 'collect':
            if (!args[1]) console.error('Please provide a github username to fetch.');
            else await collectUsers(args[1]);
            break;

        case 'fetch':
            const queryObj: { [key: string]: any } = {};

            for (const arg of args) {
                if (!arg.includes("=")) continue;
                const [key, value] = arg.split("=");
                queryObj[key] = value;
            }

            if (queryObj.language) {
                if (isNaN(queryObj.language)) queryObj.langName = queryObj.language;
                else queryObj.langId = queryObj.language;
            }

            if (queryObj.operation && queryObj.operation != 'OR' && queryObj.operation != 'AND') {
                console.log("Operation must be AND | OR");
                return;
            }

            await fetchUsers(queryObj);

            break;
        default:
            console.error('Unknown command. Please insert "collect" or "fetch" as command input.');
            break;
    }
    process.exit();
};

main();