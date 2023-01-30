import * as express from 'express';
import {createReadStream} from 'fs';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import {groupByIdGet} from '../presentation-layer/groups/group-by-id-get';
import {groupsGet} from '../presentation-layer/groups/groups-get';
import {groupCreate} from '../presentation-layer/groups/group-create';
import {
  groupCreateBodySchema,
  groupDeleteParamsSchema,
  groupGetParamsSchema,
  groupsGetQuerySchema,
  groupUpdateBodySchema,
  groupUpdateParamsSchema,
  groupUsersUpdateParamsSchema,
  groupUsersUpdateBodySchema,
} from '../utils/schema/group';
import {groupByIdDelete} from '../presentation-layer/groups/group-by-id-delete';
import {groupUpdate} from '../presentation-layer/groups/group-update';
import {groupUsersUpdate} from '../presentation-layer/groups/update-users';

const groupRouter = express.Router();
const validator = createValidator();

groupRouter.get('/', validator.query(groupsGetQuerySchema), groupsGet);
groupRouter.get(
  '/:groupId',
  validator.params(groupGetParamsSchema),
  groupByIdGet
);
groupRouter.delete(
  '/:groupId',
  validator.params(groupDeleteParamsSchema),
  groupByIdDelete
);
groupRouter.put(
  '/:groupId',
  validator.params(groupUpdateParamsSchema),
  validator.body(groupUpdateBodySchema),
  groupUpdate
);
groupRouter.put(
  '/:groupId/users',
  validator.params(groupUsersUpdateParamsSchema),
  validator.body(groupUsersUpdateBodySchema),
  groupUsersUpdate
);
groupRouter.post('/', validator.body(groupCreateBodySchema), groupCreate);

export {groupRouter};
