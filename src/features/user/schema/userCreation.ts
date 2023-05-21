import Joi, { ObjectSchema } from 'joi';

const userSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Name must be of type string',
    'string.empty': 'Name is a required field'
  }),
  lastName: Joi.string().required().messages({
    'string.base': 'Name must be of type string',
    'string.empty': 'Name is a required field'
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Email must be valid',
    'string.empty': 'Email is a required field'
  })
});

export { userSchema };