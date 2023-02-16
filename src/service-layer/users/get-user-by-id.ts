import {EXCEPTION_USER_NOT_FOUND} from '../../utils/exceptions';
import {UserGroupModel} from '../../data-access-layer/models/user-group';
import {UserModel} from '../../data-access-layer/models/user';
import {getError} from '../../utils/error';

export async function getUserById(userId: string): Promise<any> {
  const user = await UserModel.findOne({
    include: [{model: UserGroupModel, as: 'user_groups'}],
    where: {id: userId},
  });
  if (!user) {
    throw getError({type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'});
  }
  return user;
}
