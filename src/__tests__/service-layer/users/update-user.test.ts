import {UserModel} from '../../../data-access-layer/models/user';
import {updateUser} from '../../../service-layer/users/update-user';

describe('update user', () => {
  it('should update user', async () => {
    const updateMock = jest
      .spyOn(UserModel, 'update')
      .mockResolvedValueOnce({} as any);
    const findMock = jest
      .spyOn(UserModel, 'findOne')
      .mockResolvedValueOnce({
        login: 'login',
        password: 'test',
        age: 55,
        isDeleted: false,
      } as any)
      .mockResolvedValueOnce({
        login: 'login',
        password: 'test',
        age: 15,
        isDeleted: false,
      } as any);

    const res = await updateUser({userId: 'userId', age: 15});

    expect(findMock).toHaveBeenCalledTimes(2);
    expect(findMock).toHaveBeenCalledWith({where: {id: 'userId'}});
    expect(updateMock).toHaveBeenCalledWith({age: 15}, {where: {id: 'userId'}});
    expect(res).toMatchObject({
      login: 'login',
      password: 'test',
      age: 15,
      isDeleted: false,
    });
  });

  it('should throw error if user is not found', async () => {
    try {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
      await updateUser({userId: 'userId', age: 15});
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_USER_NOT_FOUND',
        message: 'User not found',
      });
    }
  });
});
