import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {createUser} from '../../service-layer/users/create-user';
import {UserCreationAttributes} from '../../data-access-layer/models/user';
import {
  EXCEPTION_BAD_DATA,
  EXCEPTION_INTERNAL_SERVER_ERROR,
} from '../../utils/exceptions';

interface userGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserCreationAttributes;
}

export async function userCreate(
  req: ValidatedRequest<userGetRequestSchema>,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const userCreated = await createUser(req.body);
    res.status(201);
    res.send({user: userCreated});
  } catch (error: any) {
    if ([EXCEPTION_BAD_DATA].includes(error.type)) {
      res.status(400);
      res.send(error.message ?? error.type);
      return;
    }
    next(error);
  }
}
