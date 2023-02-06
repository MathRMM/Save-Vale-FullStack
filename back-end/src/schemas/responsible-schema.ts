import Joi from "joi";

const responsibleSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  instituteId: Joi.number(),
});

export { responsibleSchema };
