import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {permissionsEnum} from '../../data-access-layer/constants/permissions';
import {updateGroup} from '../../service-layer/groups/update-group';
import {
  EXCEPTION_BAD_DATA,
  EXCEPTION_INTERNAL_SERVER_ERROR,
  EXCEPTION_GROUP_NOT_FOUND,
} from '../../utils/exceptions';

interface groupGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {groupId: string};
  [ContainerTypes.Body]: {name: string; permissions: permissionsEnum[]};
}

export async function groupUpdate(
  req: ValidatedRequest<groupGetRequestSchema>,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const {groupId} = req.params;
    const {name, permissions} = req.body;
    const group = await updateGroup({groupId, name, permissions});
    res.status(200);
    res.send({group});
  } catch (error: any) {
    if ([EXCEPTION_GROUP_NOT_FOUND, EXCEPTION_BAD_DATA].includes(error.type)) {
      res.status(400);
      res.send(error.message ?? error.type);
      return;
    }
    next(error);
  }
}
