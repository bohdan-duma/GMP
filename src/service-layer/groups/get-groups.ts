import {Op} from 'sequelize';
import {GroupModel} from '../../data-access-layer/models/group';

export async function getGroups({
  limit = 10,
  offset = 0,
  filter = '',
}: {
  limit?: number;
  offset?: number;
  filter?: string;
}): Promise<{
  groups: any[];
  count: number;
  limit: number;
  offset: number;
  filter: string;
}> {
  const {count, rows: groups} = await GroupModel.findAndCountAll({
    where: {
      name: {[Op.iLike]: `%${filter}%`},
    },
    order: ['name'],
    limit,
    offset,
    raw: true,
  });
  return {
    groups: groups.slice(offset, offset + limit),
    count,
    limit,
    offset: offset + limit,
    filter,
  };
}
