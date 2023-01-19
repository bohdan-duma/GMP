import * as Joi from 'joi';

export const userGetParamsSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

export const usersGetQuerySchema = Joi.object({
  limit: Joi.number(),
  offset: Joi.number(),
  filter: Joi.string(),
});

export const userDeleteParamsSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

export const userUpdateParamsSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

export const userUpdateBodySchema = Joi.object({
  age: Joi.number().min(4).max(130).required(),
});

export const userCreateBodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().min(4).max(130).required(),
});
