import apiClient from '../utils/githubClient';
import { GithubUser, GithubRepo } from '../db/models';
import db from '../db';

export interface LanguagesList<T> {
    [key: string]: T;
}

export const collectUsers = async (githubUser: string) => {
    try {
        // Fetch basic data from the user
        const userRequest = await apiClient.get<GithubUser>(`/users/${githubUser}`)
            .catch(() => console.log("User not found. Please check the github username."));
        if (!userRequest?.data) return;
        const user: GithubUser = userRequest.data;


        // Fetch repos from the user
        const reposRequest = await apiClient.get<GithubRepo[]>(`/users/${githubUser}/repos`);

        // iterate through each programing language
        const languages: string[] = [];
        await Promise.all(reposRequest.data.map(async repo => {
            const languagesRequest = await apiClient
                .get<LanguagesList<number>>(`/repos/${githubUser}/${repo.name}/languages`);
            for (const language in languagesRequest.data) {
                if (languages.includes(language)) continue;
                else languages.push(language);
            }
        }))

        await db.tx(async t => {
            // Insert or find languages
            const languageIds: number[] = [];
            for (const language of languages) {
                const languageRes = await t.oneOrNone(
                    'INSERT INTO languages (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id',
                    [language]
                );
                languageIds.push(languageRes.rows[0].id);
            }

            // Insert user data
            await t.none(
                `INSERT INTO users (githubId, name, location, languages) VALUES ($1, $2, $3, $4) ON CONFLICT (githubId)
                DO UPDATE SET name = EXCLUDED.name, location = EXCLUDED.location, languages = EXCLUDED.languages`,
                [user.id, user.name, user.location, languageIds]
            );
        });

        console.log(`Data collected and stored successfully.`);
    } catch (error) {
        console.error('Error collecting data:', error);
    }
};