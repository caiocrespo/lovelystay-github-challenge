import db from '../index';

const createUsersTable = async () => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            githubId INT UNIQUE NOT NULL,
            name VARCHAR(100) NOT NULL,
            location VARCHAR(100),
            languages INT[] DEFAULT ARRAY[]::INT[],
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    const createLanguagesTables = `
        CREATE TABLE IF NOT EXISTS languages (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL
        )
    `;

    try {
        await db.none(createUsersTable);
        await db.none(createLanguagesTables);
        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

createUsersTable();