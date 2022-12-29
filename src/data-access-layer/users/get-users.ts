import {readFileSync} from 'fs';
import {User} from '../../interfaces/user.interface';

export async function getUsers({
  limit = 10,
  offset = 0,
  filter = '',
}: {
  limit?: number;
  offset?: number;
  filter?: string;
}): Promise<{
  users: User[];
  count: number;
  limit: number;
  offset: number;
  filter: string;
}> {
  const usersData = await readFileSync('./src/data/users.json', {
    encoding: 'utf-8',
  });
  const users: User[] = JSON.parse(usersData);
  const filteredUsers = users
    .filter(({login, isDeleted}) => !isDeleted && login.includes(filter))
    .sort((userLeft, userRight) =>
      userLeft.login.localeCompare(userRight.login)
    );

  return {
    users: filteredUsers.slice(offset, offset + limit),
    count: filteredUsers.length,
    limit,
    offset: offset + limit,
    filter,
  };
}
