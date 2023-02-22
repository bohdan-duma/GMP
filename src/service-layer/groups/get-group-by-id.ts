import {EXCEPTION_GROUP_NOT_FOUND} from '../../utils/exceptions';
import {getError} from '../../utils/error';
import {GroupModel} from '../../data-access-layer/models/group';

export async function getGroupById(groupId: string): Promise<any> {
  const group = await GroupModel.findOne({
    where: {id: groupId},
  });
  if (!group) {
    throw getError({
      type: EXCEPTION_GROUP_NOT_FOUND,
      message: 'Group not found',
    });
  }
  return group;
}
