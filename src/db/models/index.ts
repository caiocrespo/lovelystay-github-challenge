export interface User {
    id: number;
    gitHubId: number;
    name: string;
    location: string;
    languages: any[];
}

export interface GithubUser {
    id: number;
    name: string;
    location: string;
}

export interface GithubRepo {
    name: string;
}