import {EXCEPTION_USER_NOT_FOUND} from '../../utils/exceptions';
import {UserAttributes, UserModel} from '../../data-access-layer/models/user';
import {getError} from '../../utils/error';

export async function getUserByLogin(login: string): Promise<UserAttributes> {
  const user = await UserModel.findOne({
    where: {login},
  });
  if (!user) {
    throw getError({type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'});
  }
  return user.toJSON();
}
