import * as express from 'express';
import {createReadStream} from 'fs';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import {userByIdGet} from '../presentation-layer/users/user-by-id-get';
import {usersGet} from '../presentation-layer/users/users-get';
import {userCreate} from '../presentation-layer/users/user-create';
import {
  userCreateBodySchema,
  userDeleteParamsSchema,
  userGetParamsSchema,
  usersGetQuerySchema,
  userUpdateBodySchema,
  userUpdateParamsSchema,
} from '../utils/shema';
import {userByIdDelete} from '../presentation-layer/users/user-by-id-delete';
import {userUpdate} from '../presentation-layer/users/user-update';

const userRouter = express.Router();
const validator = createValidator();

userRouter.get('/', validator.query(usersGetQuerySchema), usersGet);
userRouter.get('/:userId', validator.params(userGetParamsSchema), userByIdGet);
userRouter.delete(
  '/:userId',
  validator.params(userDeleteParamsSchema),
  userByIdDelete
);
userRouter.put(
  '/:userId',
  validator.params(userUpdateParamsSchema),
  validator.body(userUpdateBodySchema),
  userUpdate
);
userRouter.post('/', validator.body(userCreateBodySchema), userCreate);

export {userRouter};
