import Joi from "joi";

const addressSchema = Joi.object({
  id: Joi.number(),
  number: Joi.number().required(),
  neighborhood: Joi.string().required(),
  street: Joi.string().required(),
  zipCode: Joi.string().required(),
  addressDetail: Joi.string().empty(""),
  instituteId: Joi.number().required(),
  city: Joi.object({
    name: Joi.string().required(),
    zoneId: Joi.number().required(),
  }),
  state: Joi.object({
    name: Joi.string().required(),
  }),
});

export { addressSchema };
