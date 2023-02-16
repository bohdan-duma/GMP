import {EXCEPTION_USER_NOT_FOUND} from '../../utils/exceptions';
import {getError} from '../../utils/error';
import {UserModel} from '../../data-access-layer/models/user';
import {UserGroupModel} from '../../data-access-layer/models/user-group';

export async function deleteUserById(userId: string): Promise<void> {
  const user = await UserModel.findOne({where: {id: userId}});
  if (!user) {
    throw getError({type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'});
  }
  await UserModel.update({is_deleted: true}, {where: {id: userId}});
  await UserGroupModel.destroy({where: {user_id: userId}});
}
