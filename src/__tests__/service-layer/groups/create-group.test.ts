import {permissionsEnum} from '../../../data-access-layer/constants/permissions';
import {GroupModel} from '../../../data-access-layer/models/group';
import {createGroup} from '../../../service-layer/groups/create-group';

describe('create group', () => {
  it('should create group', async () => {
    const createMock = jest.spyOn(GroupModel, 'create').mockResolvedValue({
      id: 'id',
      name: 'name',
      permissions: ['write', 'share'],
    });
    const res = await createGroup({
      name: 'name',
      permissions: [
        permissionsEnum.WRITE,
        permissionsEnum.SHARE,
        permissionsEnum.WRITE,
      ],
    });
    expect(createMock).toHaveBeenCalledWith({
      name: 'name',
      permissions: ['write', 'share'],
    });
    expect(res).toMatchObject({
      id: 'id',
      name: 'name',
      permissions: ['write', 'share'],
    });
  });
});
