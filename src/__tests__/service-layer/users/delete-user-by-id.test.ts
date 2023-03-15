import {UserModel} from '../../../data-access-layer/models/user';
import {UserGroupModel} from '../../../data-access-layer/models/user-group';
import {deleteUserById} from '../../../service-layer/users/delete-user-by-id';

describe('delete user by id', () => {
  it('should delete user', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValue({
      login: 'test',
      password: 'test',
      age: 55,
      isDeleted: false,
    } as any);
    const updateMock = jest
      .spyOn(UserModel, 'update')
      .mockResolvedValue({} as any);
    const destroyMock = jest
      .spyOn(UserGroupModel, 'destroy')
      .mockResolvedValue({} as any);

    await deleteUserById('userId');
    expect(updateMock).toHaveBeenCalledWith(
      {is_deleted: true},
      {where: {id: 'userId'}}
    );
    expect(destroyMock).toHaveBeenCalledWith({where: {user_id: 'userId'}});
  });

  it('should throw error if user is not found', async () => {
    try {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
      await deleteUserById('userId');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_USER_NOT_FOUND',
        message: 'User not found',
      });
    }
  });
});
