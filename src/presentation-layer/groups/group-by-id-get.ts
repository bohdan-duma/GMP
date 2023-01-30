import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {getGroupById} from '../../service-layer/groups/get-group-by-id';
import {
  EXCEPTION_INTERNAL_SERVER_ERROR,
  EXCEPTION_GROUP_NOT_FOUND,
} from '../../utils/exceptions';

interface groupGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {groupId: string};
}

export async function groupByIdGet(
  req: ValidatedRequest<groupGetRequestSchema>,
  res: Express.Response
) {
  try {
    const {groupId} = req.params;
    const group = await getGroupById(groupId);
    res.status(200);
    res.send({group});
  } catch (error: any) {
    if ([EXCEPTION_GROUP_NOT_FOUND].includes(error.type)) {
      res.status(400);
      res.send(error.message ?? error.type);
      return;
    }
    console.error(error);
    res.status(500);
    res.send(EXCEPTION_INTERNAL_SERVER_ERROR);
  }
}
