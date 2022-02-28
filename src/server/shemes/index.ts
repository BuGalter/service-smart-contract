import * as Joi from 'joi';

export const schemaPayload = Joi.object({
  tokenAddress: Joi.string()
    .min(42)
    .max(42)
    .required(),

  amount: Joi.number()
    .required(),
  
  userPrivateKey: Joi.string()
    .min(64)
    .max(64)
    .required(),
});
