import {UserModel} from '../../../data-access-layer/models/user';
import {getUserByLogin} from '../../../service-layer/users/get-user-by-login';

describe('get user by login', () => {
  it('should get user', async () => {
    const findMock = jest.spyOn(UserModel, 'findOne').mockResolvedValue({
      toJSON: () => ({
        login: 'login',
        password: 'test',
        age: 55,
        isDeleted: false,
      }),
    } as any);

    const res = await getUserByLogin('login');
    expect(findMock).toHaveBeenCalledWith({
      where: {login: 'login'},
    });
    expect(res).toMatchObject({
      login: 'login',
      password: 'test',
      age: 55,
      isDeleted: false,
    });
  });

  it('should throw error if user is not found', async () => {
    try {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
      await getUserByLogin('login');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_USER_NOT_FOUND',
        message: 'User not found',
      });
    }
  });
});
