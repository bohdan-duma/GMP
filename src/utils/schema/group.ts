import * as Joi from 'joi';
import {PERMISSIONS} from '../../data-access-layer/constants/permissions';

export const groupCreateBodySchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array()
    .items(...PERMISSIONS)
    .required(),
});

export const groupGetParamsSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
});

export const groupsGetQuerySchema = Joi.object({
  limit: Joi.number(),
  offset: Joi.number(),
  filter: Joi.string(),
});

export const groupDeleteParamsSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
});

export const groupUpdateParamsSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
});

export const groupUpdateBodySchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array()
    .items(...PERMISSIONS)
    .required(),
});

export const groupUsersUpdateParamsSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
});

export const groupUsersUpdateBodySchema = Joi.object({
  userIds: Joi.array().items(Joi.string()).required(),
});
