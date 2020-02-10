const Joi = require('@hapi/joi');

const ValidateBody = (schema, body, next) => {
  const { error } = schema.validate(body, { abortEarly: false });
  if (error) return next(error);
  return next();
};

exports.Login = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return ValidateBody(schema, req.body, next);
};

exports.Register = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(1024).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return ValidateBody(schema, req.body, next);
};
