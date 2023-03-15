import {GroupModel} from '../../../data-access-layer/models/group';
import {getGroupById} from '../../../service-layer/groups/get-group-by-id';

describe('get group by id', () => {
  it('should get group', async () => {
    jest.spyOn(GroupModel, 'findOne').mockResolvedValue({
      name: 'name',
      permissions: ['write', 'share'],
    } as any);

    const res = await getGroupById('groupId');
    expect(res).toMatchObject({
      name: 'name',
      permissions: ['write', 'share'],
    });
  });

  it('should throw error if group is not found', async () => {
    try {
      jest.spyOn(GroupModel, 'findOne').mockResolvedValue(null);
      const res = await getGroupById('groupId');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_GROUP_NOT_FOUND',
        message: 'Group not found',
      });
    }
  });
});
