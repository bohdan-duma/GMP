import {UserModel} from '../../../data-access-layer/models/user';
import {createUser} from '../../../service-layer/users/create-user';

describe('create user', () => {
  it('should create user', async () => {
    jest.spyOn(UserModel, 'create').mockResolvedValue({
      toJSON: () => ({
        login: 'test',
        password: 'test',
        age: 55,
        isDeleted: false,
      }),
    });
    const res = await createUser({login: 'test', password: 'test', age: 55});
    expect(res).toMatchObject({
      login: 'test',
      password: 'test',
      age: 55,
      isDeleted: false,
    });
  });

  it('should throw error for invalid password', async () => {
    try {
      await createUser({login: 'test', password: '*(&*^', age: 55});
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_BAD_DATA',
        message: 'Password should contain only letters and numbers',
      });
    }
  });

  it('should throw error if user already exit', async () => {
    try {
      jest.spyOn(UserModel, 'create').mockRejectedValue({
        name: 'SequelizeUniqueConstraintError',
      });
      const res = await createUser({login: 'test', password: 'test', age: 55});
      expect(res).toMatchObject({
        login: 'test',
        password: 'test',
        age: 55,
        isDeleted: false,
      });
    } catch (error) {
      expect(error).toMatchObject({
        type: 'EXCEPTION_BAD_DATA',
        message: 'User already exists',
      });
    }
  });
});
