import {UserModel} from '../../../data-access-layer/models/user';
import {getUserById} from '../../../service-layer/users/get-user-by-id';

describe('get user by id', () => {
  it('should get user', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValue({
      login: 'test',
      password: 'test',
      age: 55,
      isDeleted: false,
    } as any);

    const res = await getUserById('userId');
    expect(res).toMatchObject({
      login: 'test',
      password: 'test',
      age: 55,
      isDeleted: false,
    });
  });

  it('should throw error if user is not found', async () => {
    try {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
      await getUserById('userId');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_USER_NOT_FOUND',
        message: 'User not found',
      });
    }
  });
});
