import * as express from 'express';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import {userByIdGet} from '../presentation-layer/users/user-by-id-get';
import {usersGet} from '../presentation-layer/users/users-get';
import {userCreate} from '../presentation-layer/users/user-create';
import {checkTokenMiddleware} from '../middlewares/checkToken';
import {
  userCreateBodySchema,
  userDeleteParamsSchema,
  userGetParamsSchema,
  usersGetQuerySchema,
  userUpdateBodySchema,
  userUpdateParamsSchema,
} from '../utils/schema/user';
import {userByIdDelete} from '../presentation-layer/users/user-by-id-delete';
import {userUpdate} from '../presentation-layer/users/user-update';

const userRouter = express.Router();
const validator = createValidator();

userRouter.get(
  '/',
  checkTokenMiddleware,
  validator.query(usersGetQuerySchema),
  usersGet
);
userRouter.get(
  '/:userId',
  checkTokenMiddleware,
  validator.params(userGetParamsSchema),
  userByIdGet
);
userRouter.delete(
  '/:userId',
  checkTokenMiddleware,
  validator.params(userDeleteParamsSchema),
  userByIdDelete
);
userRouter.put(
  '/:userId',
  checkTokenMiddleware,
  validator.params(userUpdateParamsSchema),
  validator.body(userUpdateBodySchema),
  userUpdate
);
userRouter.post('/', validator.body(userCreateBodySchema), userCreate);

export {userRouter};
