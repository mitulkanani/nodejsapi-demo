const Joi = require('@hapi/joi');

const ValidateBody = (schema, body, next) => {
  const { error } = schema.validate(body, { abortEarly: false });
  if (error) return next(error);
  return next();
};

exports.Create = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    tags: Joi.string().required(),
    type: Joi.number().required(),
  });
  return ValidateBody(schema, req.body, next);
};
