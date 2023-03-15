import {Op} from 'sequelize';
import {UserGroupModel} from '../../data-access-layer/models/user-group';
import {UserAttributes, UserModel} from '../../data-access-layer/models/user';

export async function getUsers({
  limit = 10,
  offset = 0,
  filter = '',
}: {
  limit?: number;
  offset?: number;
  filter?: string;
}): Promise<{
  users: any[];
  count: number;
  limit: number;
  offset: number;
  filter: string;
}> {
  const {count, rows: users} = await UserModel.findAndCountAll({
    include: [{model: UserGroupModel, as: 'user_groups'}],
    where: {
      is_deleted: false,
      login: {[Op.iLike]: `%${filter}%`},
    },
    order: ['login'],
    limit,
    offset,
    raw: true,
  });
  return {
    users,
    count,
    limit,
    offset: offset + limit,
    filter,
  };
}
