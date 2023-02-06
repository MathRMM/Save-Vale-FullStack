import Joi from "joi";

export const instituteSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  withdraw: Joi.boolean().required(),
  description: Joi.string().required(),
  image: Joi.string()
    // eslint-disable-next-line no-useless-escape
    .regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/)
    .required()
    .label("Por favor insira uma url valida."),
});
