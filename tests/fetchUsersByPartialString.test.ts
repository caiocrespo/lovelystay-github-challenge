import { fetchUsers } from '../src/commands/fetchUsers';
import { collectUsers } from '../src/commands/collectUsers';

describe('fetchUsersByPartialString', () => {
    it('should return users that match the partial string in name or location', async () => {
        await collectUsers('caiocrespo');
        const users: any[] = await fetchUsers({ operation: 'AND', location: 'lisbon', langName: 'Javascript' })
            .then(r => r as any[]);

        expect(users[0].githubid).toBe(54872836);
    });
});