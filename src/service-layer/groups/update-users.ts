import sequelize from '../../data-access-layer/index';
import {GroupModel} from '../../data-access-layer/models/group';
import {EXCEPTION_GROUP_NOT_FOUND} from '../../utils/exceptions';
import {UserModel} from '../../data-access-layer/models/user';
import {Op} from 'sequelize';
import {UserGroupModel} from '../../data-access-layer/models/user-group';

export async function updateGroupUsers({
  groupId,
  userIds,
}: {
  groupId: string;
  userIds: string[];
}): Promise<any> {
  const group: any = await GroupModel.findOne({
    include: [{model: UserGroupModel, as: 'group_users'}],
    where: {id: groupId},
  });
  if (!group) {
    throw {type: EXCEPTION_GROUP_NOT_FOUND, message: 'Group not found'};
  }

  const users: any = await UserModel.findAll({
    attributes: ['id'],
    where: {
      id: {[Op.in]: [...new Set(userIds)]},
    },
  });
  const uniqUserIds = users.map(({id}: any) => id);

  const currentUsers: string[] = group.group_users.map(
    (user: any) => user.user_id
  );
  const usersToAdd = uniqUserIds.filter(
    (id: string) => !currentUsers.includes(id)
  );
  const usersToRemove = currentUsers.filter(id => !uniqUserIds.includes(id));
  if (!usersToAdd.length && !usersToRemove.length) {
    return;
  }

  return await sequelize.transaction(async transaction => {
    await Promise.all([
      usersToAdd.length
        ? UserGroupModel.bulkCreate(
            usersToAdd.map((userId: string) => ({
              user_id: userId,
              group_id: groupId,
            })),
            {transaction}
          )
        : Promise.resolve(),
      usersToRemove.length
        ? UserGroupModel.destroy({
            where: {group_id: groupId, user_id: {[Op.in]: usersToRemove}},
            transaction,
          })
        : Promise.resolve(),
      ,
    ]);
  });
}
