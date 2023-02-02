import {EXCEPTION_USER_NOT_FOUND} from '../../utils/exceptions';
import {UserModel} from '../../data-access-layer/models/user';

export async function deleteUserById(userId: string): Promise<void> {
  const user = await UserModel.findOne({where: {id: userId}});
  if (!user) {
    throw {type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'};
  }
  await UserModel.destroy({where: {id: userId}});
}
