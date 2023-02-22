import * as bcrypt from 'bcrypt';
import {
  GroupCreationAttributes,
  GroupModel,
} from '../../data-access-layer/models/group';
import {EXCEPTION_BAD_DATA} from '../../utils/exceptions';

export async function createGroup(
  group: GroupCreationAttributes
): Promise<any> {
  const uniqPermissions = [...new Set(group.permissions)];

  const groupCreated = await GroupModel.create({
    name: group.name,
    permissions: uniqPermissions,
  });

  return groupCreated;
}
