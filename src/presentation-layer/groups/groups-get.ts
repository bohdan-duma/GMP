import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {getGroups} from '../../service-layer/groups/get-groups';
import {EXCEPTION_INTERNAL_SERVER_ERROR} from '../../utils/exceptions';

interface groupGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    limit?: number;
    offset?: number;
    filter?: string;
  };
}

export async function groupsGet(
  req: ValidatedRequest<groupGetRequestSchema>,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const {groups, count, limit, offset, filter} = await getGroups({
      limit: req.query.limit,
      offset: req.query.offset,
      filter: req.query.filter,
    });
    res.status(200);
    res.send({
      groups,
      ...(count > offset
        ? {
            nextPageParams: `http://localhost:7070/groups?limit=${limit}&offset=${offset}${
              filter ? `filter=${filter}` : ''
            }`,
          }
        : {}),
    });
  } catch (error: any) {
    next(error);
  }
}
