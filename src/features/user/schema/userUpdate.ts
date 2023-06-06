import Joi, { ObjectSchema } from 'joi';

const userUpdateSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().messages({
    'string.base': 'Name must be of type string',
    'string.empty': 'Name is a required field'
  }),
  lastName: Joi.string().messages({
    'string.base': 'Name must be of type string',
    'string.empty': 'Name is a required field'
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Email must be valid',
    'string.empty': 'Email is a required field'
  }),
  type: Joi.string().messages({
    'string.base': 'Type must be of type string',
    'string.empty': 'Type is a required field'
  }),
});

export { userUpdateSchema };