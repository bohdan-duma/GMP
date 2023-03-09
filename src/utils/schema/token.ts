import * as Joi from 'joi';

export const tokenGenerateBodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});
