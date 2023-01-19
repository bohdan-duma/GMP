import {EXCEPTION_USER_NOT_FOUND} from '../../utils/exceptions';
import {UserModel} from '../../data-access-layer/models/user';

export async function getUserById(userId: string): Promise<any> {
  const user = await UserModel.findOne({where: {id: userId}});
  if (!user) {
    throw {type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'};
  }
  return user;
}
