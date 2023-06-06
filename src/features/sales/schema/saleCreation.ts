import Joi, { ObjectSchema } from 'joi';
import { ObjectId } from 'mongodb';

const saleSchema: ObjectSchema = Joi.object().keys({
  rut: Joi.string().required().messages({
    'string.base': 'Rut must be of type string',
    'string.empty': 'Rut is a required field'
  }),
  clientName: Joi.string().required().messages({
    'string.base': 'clientName must be of type string',
    'string.empty': 'clientName is a required field'
  }),
  clientLastName: Joi.string().required().messages({
    'string.base': 'clientLastName must be of type string',
    'string.empty': 'clientLastName is a required field'
  }),
  clientEmail: Joi.string().required().email().messages({
    'string.base': 'clientEmail must be of type string',
    'string.email': 'clientEmail must be valid',
    'string.empty': 'clientEmail is a required field'
  }),
  clientPhone: Joi.string().required().messages({
    'string.base': 'clientPhone must be of type string',
    'string.empty': 'clientPhone is a required field'
  }),
  clientPhoneTwo: Joi.string().messages({
    'string.base': 'clientPhoneTwo must be of type string',
    'string.empty': 'clientPhoneTwo is a required field'
  }),
  clientAddress: Joi.string().required().messages({
    'string.base': 'clientAddress must be of type string',
    'string.empty': 'clientAddress is a required field'
  }),
  clientReference: Joi.string().required().messages({
    'string.base': 'clientReference must be of type string',
    'string.empty': 'clientReference is a required field'
  }),
  clientComuna: Joi.string().required().messages({
    'string.base': 'clientComuna must be of type string',
    'string.empty': 'clientComuna is a required field'
  }),
  clientRegion: Joi.string().required().messages({
    'string.base': 'clientRegion must be of type string',
    'string.empty': 'clientRegion is a required field'
  }),
  plan: Joi.string().required().messages({
    'string.base': 'plan must be of type string',
    'string.empty': 'plan is a required field'
  }),
  decos: Joi.number().integer().min(2).max(6).required().messages({
    'string.base': 'decos must be of type number',
    'string.empty': 'decos is a required field'
  }),
  premiums: Joi.array().messages({
    'string.base': 'premiums must be of type array',
    'string.empty': 'premiums is a required field'
  }),
  user: Joi.required().messages({
    'string.empty': 'user is a required field'
  }),
});

export { saleSchema };
