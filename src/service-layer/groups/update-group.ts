import {getError} from '../../utils/error';
import {permissionsEnum} from '../../data-access-layer/constants/permissions';
import {GroupModel} from '../../data-access-layer/models/group';
import {EXCEPTION_GROUP_NOT_FOUND} from '../../utils/exceptions';

export async function updateGroup({
  groupId,
  name,
  permissions,
}: {
  groupId: string;
  name: string;
  permissions: permissionsEnum[];
}): Promise<any> {
  const group = await GroupModel.findOne({where: {id: groupId}});
  if (!group) {
    throw getError({
      type: EXCEPTION_GROUP_NOT_FOUND,
      message: 'Group not found',
    });
  }

  const uniqPermissions = [...new Set(permissions)];
  await GroupModel.update(
    {name, permissions: uniqPermissions},
    {where: {id: groupId}}
  );
  return GroupModel.findOne({where: {id: groupId}});
}
