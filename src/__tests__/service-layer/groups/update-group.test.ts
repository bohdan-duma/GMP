import {permissionsEnum} from '../../../data-access-layer/constants/permissions';
import {GroupModel} from '../../../data-access-layer/models/group';
import {updateGroup} from '../../../service-layer/groups/update-group';

describe('update group', () => {
  it('should update group', async () => {
    const updateMock = jest
      .spyOn(GroupModel, 'update')
      .mockResolvedValueOnce({} as any);
    const findMock = jest
      .spyOn(GroupModel, 'findOne')
      .mockResolvedValueOnce({
        id: 'groupId',
        name: 'name',
        permissions: [],
      } as any)
      .mockResolvedValueOnce({
        id: 'groupId',
        name: 'newName',
        permissions: ['write', 'upload_files'],
      } as any);

    const res = await updateGroup({
      groupId: 'groupId',
      name: 'newName',
      permissions: [permissionsEnum.WRITE, permissionsEnum.UPLOAD_FILES],
    });

    expect(findMock).toHaveBeenCalledTimes(2);
    expect(findMock).toHaveBeenCalledWith({where: {id: 'groupId'}});
    expect(updateMock).toHaveBeenCalledWith(
      {
        name: 'newName',
        permissions: [permissionsEnum.WRITE, permissionsEnum.UPLOAD_FILES],
      },
      {where: {id: 'groupId'}}
    );
    expect(res).toMatchObject({
      id: 'groupId',
      name: 'newName',
      permissions: ['write', 'upload_files'],
    });
  });

  it('should throw error if group is not found', async () => {
    try {
      jest.spyOn(GroupModel, 'findOne').mockResolvedValue(null);
      await updateGroup({
        groupId: 'groupId',
        name: 'newName',
        permissions: [permissionsEnum.WRITE, permissionsEnum.UPLOAD_FILES],
      });
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_GROUP_NOT_FOUND',
        message: 'Group not found',
      });
    }
  });
});
