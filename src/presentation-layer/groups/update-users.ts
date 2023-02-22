import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {updateGroupUsers} from '../../service-layer/groups/update-users';
import {
  EXCEPTION_BAD_DATA,
  EXCEPTION_INTERNAL_SERVER_ERROR,
  EXCEPTION_GROUP_NOT_FOUND,
} from '../../utils/exceptions';

interface groupUsersUpdateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {groupId: string};
  [ContainerTypes.Body]: {userIds: string[]};
}

export async function groupUsersUpdate(
  req: ValidatedRequest<groupUsersUpdateRequestSchema>,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const {groupId} = req.params;
    const {userIds} = req.body;
    await updateGroupUsers({groupId, userIds});
    res.status(204);
    res.send();
  } catch (error: any) {
    if ([EXCEPTION_GROUP_NOT_FOUND, EXCEPTION_BAD_DATA].includes(error.type)) {
      res.status(400);
      res.send(error.message ?? error.type);
      return;
    }
    next(error);
  }
}
