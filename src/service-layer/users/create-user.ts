import * as bcrypt from 'bcrypt';
import {
  UserCreationAttributes,
  UserAttributes,
  UserModel,
} from '../../data-access-layer/models/user';
import {EXCEPTION_BAD_DATA} from '../../utils/exceptions';

export async function createUser(user: UserCreationAttributes): Promise<any> {
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

  try {
    const userCreated = await UserModel.create({
      login: user.login,
      age: user.age,
      password: passwordEncrypted,
    });
    console.log(userCreated);
    return userCreated;
  } catch (error: any) {
    console.log(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw {type: EXCEPTION_BAD_DATA, message: 'User already exists'};
    }
    throw error;
  }
}
