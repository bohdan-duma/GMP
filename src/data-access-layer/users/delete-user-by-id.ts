import {readFileSync, writeFileSync} from 'fs';
import {EXCEPTION_USER_NOT_FOUND} from '../../utils/exceptions';
import {User} from '../../interfaces/user.interface';

export async function deleteUserById(userId: string): Promise<void> {
  const usersData = await readFileSync('./src/data/users.json', {
    encoding: 'utf-8',
  });
  const users: User[] = JSON.parse(usersData);
  const user = users.find(({id}) => userId === id);
  if (!user) {
    throw {type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'};
  }
  await writeFileSync(
    './src/data/users.json',
    JSON.stringify(users.filter(({id}) => id != userId))
  );
}
