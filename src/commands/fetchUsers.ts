import { User } from '../db/models';
import db from '../db';

export const fetchUsers = async ({ location, langName, langId, operation = 'OR' }:
    { location?: string, langName?: string, langId?: number, operation?: string }) => {
    try {
        if (langName) {
            const lanFetch = await db.any(`SELECT * FROM languages WHERE name ILIKE $1`, [`%${langName}%`]);
            langId = lanFetch[0]?.id;
        }

        if (langId && !location) operation = "AND";

        let queryString: string = "SELECT * FROM users";
        queryString += ` WHERE location ILIKE $1`;
        queryString += ` ${operation} $2 = ANY(languages)`;
        
        const res = await db.any(queryString, [
            `%${location || ""}%`,
            langId || 0,
        ]);

        const reStructure = await Promise.all(res.map(async (user: User) => {
            user.languages = await Promise.all(user.languages.map(async (langId) => {
                const langRes = await db.any(`SELECT * FROM languages WHERE id = $1`, [langId]);
                return JSON.stringify(langRes[0]);
            }));
            return user;
        }));
        
        console.table(reStructure);
        return reStructure;
    } catch (error) {
        console.error('Error displaying data:', error);
    }
    return true;
};
