import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {getUsers} from '../../service-layer/users/get-users';
import {EXCEPTION_INTERNAL_SERVER_ERROR} from '../../utils/exceptions';

interface userGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    limit?: number;
    offset?: number;
    filter?: string;
  };
}

export async function usersGet(
  req: ValidatedRequest<userGetRequestSchema>,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const {users, count, limit, offset, filter} = await getUsers({
      limit: req.query.limit,
      offset: req.query.offset,
      filter: req.query.filter,
    });
    res.status(200);
    res.send({
      users,
      ...(count > offset
        ? {
            nextPageParams: `http://localhost:7070/users?limit=${limit}&offset=${offset}${
              filter ? `filter=${filter}` : ''
            }`,
          }
        : {}),
    });
  } catch (error: any) {
    next(error);
  }
}
