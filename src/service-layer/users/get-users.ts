import {Op} from 'sequelize';
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
  const users = await UserModel.findAll({
    where: {
      is_deleted: false,
      login: {[Op.iLike]: `%${filter}%`},
    },
    order: ['login'],
    limit,
    offset,
  });
  const count = await UserModel.count({
    where: {
      is_deleted: false,
      login: {[Op.iLike]: `%${filter}%`},
    },
  });
  return {
    users: users.slice(offset, offset + limit),
    count,
    limit,
    offset: offset + limit,
    filter,
  };
}
