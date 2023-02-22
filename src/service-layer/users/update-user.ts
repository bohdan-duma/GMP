import {UserModel} from '../../data-access-layer/models/user';
import {EXCEPTION_USER_NOT_FOUND} from '../../utils/exceptions';
import {getError} from '../../utils/error';

export async function updateUser({
  userId,
  age,
}: {
  userId: string;
  age: number;
}): Promise<any> {
  const user = await UserModel.findOne({where: {id: userId}});
  if (!user) {
    throw getError({type: EXCEPTION_USER_NOT_FOUND, message: 'User not found'});
  }
  await UserModel.update({age}, {where: {id: userId}});
  return UserModel.findOne({where: {id: userId}});
}
