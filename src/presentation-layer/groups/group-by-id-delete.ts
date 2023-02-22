import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {deleteGroupById} from '../../service-layer/groups/delete-group-by-id';
import {
  EXCEPTION_INTERNAL_SERVER_ERROR,
  EXCEPTION_GROUP_NOT_FOUND,
} from '../../utils/exceptions';

interface groupGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {groupId: string};
}

export async function groupByIdDelete(
  req: ValidatedRequest<groupGetRequestSchema>,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const {groupId} = req.params;
    await deleteGroupById(groupId);
    res.status(204);
    res.send();
  } catch (error: any) {
    if ([EXCEPTION_GROUP_NOT_FOUND].includes(error.type)) {
      res.status(400);
      res.send(error.message ?? error.type);
      return;
    }
    next(error);
  }
}
