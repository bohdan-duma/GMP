import * as Express from 'express';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';
import {createGroup} from '../../service-layer/groups/create-group';
import {GroupCreationAttributes} from '../../data-access-layer/models/group';
import {
  EXCEPTION_BAD_DATA,
  EXCEPTION_INTERNAL_SERVER_ERROR,
} from '../../utils/exceptions';

interface groupGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: GroupCreationAttributes;
}

export async function groupCreate(
  req: ValidatedRequest<groupGetRequestSchema>,
  res: Express.Response
) {
  try {
    const groupCreated = await createGroup(req.body);
    res.status(201);
    res.send({group: groupCreated});
  } catch (error: any) {
    if ([EXCEPTION_BAD_DATA].includes(error.type)) {
      res.status(400);
      res.send(error.message ?? error.type);
      return;
    }
    console.error(error);
    res.status(500);
    res.send(EXCEPTION_INTERNAL_SERVER_ERROR);
  }
}
