import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {updateUser} from '../../service-layer/users/update-user';
import {
  EXCEPTION_BAD_DATA,
  EXCEPTION_INTERNAL_SERVER_ERROR,
  EXCEPTION_USER_NOT_FOUND,
} from '../../utils/exceptions';

interface userGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {userId: string};
  [ContainerTypes.Body]: {age: number};
}

export async function userUpdate(
  req: ValidatedRequest<userGetRequestSchema>,
  res: Express.Response
) {
  try {
    const {userId} = req.params;
    const {age} = req.body;
    const user = await updateUser({userId, age});
    res.status(200);
    res.send({user});
  } catch (error: any) {
    if ([EXCEPTION_USER_NOT_FOUND, EXCEPTION_BAD_DATA].includes(error.type)) {
      res.status(400);
      res.send(error.message ?? error.type);
      return;
    }
    console.error(error);
    res.status(500);
    res.send(EXCEPTION_INTERNAL_SERVER_ERROR);
  }
}
