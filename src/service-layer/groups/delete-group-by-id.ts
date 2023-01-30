import {EXCEPTION_GROUP_NOT_FOUND} from '../../utils/exceptions';
import {GroupModel} from '../../data-access-layer/models/group';

export async function deleteGroupById(groupId: string): Promise<void> {
  const group = await GroupModel.findOne({where: {id: groupId}});
  if (!group) {
    throw {type: EXCEPTION_GROUP_NOT_FOUND, message: 'Group not found'};
  }
  await GroupModel.destroy({where: {id: groupId}});
}
