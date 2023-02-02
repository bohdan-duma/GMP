import {where} from 'sequelize';
import {UserModel} from '../../data-access-layer/models/user';
import {EXCEPTION_USER_NOT_FOUND} from '../../utils/exceptions';

export async function updateUser({
  userId,
  age,
}: {
  userId: string;
  age: number;
}): Promise<any> {
  const user = await UserModel.findOne({where: {id: userId}});
  if (!user) {
    throw {type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'};
  }
  const userUpdated = await UserModel.update({age}, {where: {id: userId}});
  return userUpdated;
}
