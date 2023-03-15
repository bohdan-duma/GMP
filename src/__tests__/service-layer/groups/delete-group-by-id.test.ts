import {GroupModel} from '../../../data-access-layer/models/group';
import {deleteGroupById} from '../../../service-layer/groups/delete-group-by-id';

describe('delete group by id', () => {
  it('should delete group', async () => {
    jest.spyOn(GroupModel, 'findOne').mockResolvedValue({name: 'name'} as any);
    const destroyMock = jest
      .spyOn(GroupModel, 'destroy')
      .mockResolvedValue({} as any);

    await deleteGroupById('groupId');
    expect(destroyMock).toHaveBeenCalledWith({where: {id: 'groupId'}});
  });

  it('should throw error if group is not found', async () => {
    try {
      jest.spyOn(GroupModel, 'findOne').mockResolvedValue(null);
      await deleteGroupById('groupId');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_GROUP_NOT_FOUND',
        message: 'Group not found',
      });
    }
  });
});
