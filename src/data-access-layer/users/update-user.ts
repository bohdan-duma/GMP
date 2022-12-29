import * as bcrypt from 'bcrypt';
import {readFileSync, writeFileSync} from 'fs';
import {v1 as uuidv1} from 'uuid';
import {User} from '../../interfaces/user.interface';
import {
  EXCEPTION_BAD_DATA,
  EXCEPTION_USER_NOT_FOUND,
} from '../../utils/exceptions';

export async function updateUser({
  userId,
  age,
}: {
  userId: string;
  age: number;
}): Promise<User> {
  const usersData = await readFileSync('./src/data/users.json', {
    encoding: 'utf-8',
  });
  const users: User[] = JSON.parse(usersData);
  const user = users.find(({id}) => userId === id);
  if (!user) {
    throw {type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'};
  }
  if (age < 4 || age > 130) {
    throw {
      type: EXCEPTION_BAD_DATA,
      message: 'User age should be in range [4, 130]',
    };
  }
  const userUpdated = {...user, age};
  await writeFileSync(
    './src/data/users.json',
    JSON.stringify([...users.filter(({id}) => userId !== id), userUpdated])
  );
  return userUpdated;
}
