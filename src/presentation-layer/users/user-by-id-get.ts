import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {getUserById} from '../../service-layer/users/get-user-by-id';
import {
  EXCEPTION_INTERNAL_SERVER_ERROR,
  EXCEPTION_USER_NOT_FOUND,
} from '../../utils/exceptions';

interface userGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {userId: string};
}

export async function userByIdGet(
  req: ValidatedRequest<userGetRequestSchema>,
  res: Express.Response
) {
  try {
    const {userId} = req.params;
    const user = await getUserById(userId);
    res.status(200);
    res.send({user});
  } catch (error: any) {
    if ([EXCEPTION_USER_NOT_FOUND].includes(error.type)) {
      res.status(400);
      res.send(error.message ?? error.type);
      return;
    }
    console.error(error);
    res.status(500);
    res.send(EXCEPTION_INTERNAL_SERVER_ERROR);
  }
}
