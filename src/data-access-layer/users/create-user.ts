import * as bcrypt from 'bcrypt';
import {readFileSync, writeFileSync} from 'fs';
import {v1 as uuidv1} from 'uuid';
import {User} from '../../interfaces/user.interface';
import {EXCEPTION_BAD_DATA} from '../../utils/exceptions';

export async function createUser(user: Partial<User>): Promise<User> {
  const usersData = await readFileSync('./src/data/users.json', {
    encoding: 'utf-8',
  });
  const users: User[] = JSON.parse(usersData);
  if (!user.login || users.some(({login}) => login === user.login)) {
    throw {type: EXCEPTION_BAD_DATA, message: 'User already exists'};
  }
  if (!user.age || user.age < 4 || user.age > 130) {
    throw {
      type: EXCEPTION_BAD_DATA,
      message: 'User age should be in range [4, 130]',
    };
  }
  if (!user.password || !/^[A-Za-z0-9]+$/.test(user.password)) {
    throw {
      type: EXCEPTION_BAD_DATA,
      message: 'Password should contain only letters and numbers',
    };
  }

  const salt = await bcrypt.genSalt(10);
  const passwordEncrypted = await bcrypt.hash(user.password, salt);

  const userCreated = {
    login: user.login,
    age: user.age,
    id: uuidv1(),
    password: passwordEncrypted,
    isDeleted: false,
  };
  await writeFileSync(
    './src/data/users.json',
    JSON.stringify([...users, userCreated])
  );
  return userCreated;
}
