import joi from 'joi'

const registerSchema = joi.object({
  name: joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'El nombre debe ser un texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.max': 'El nombre no puede tener más de 100 caracteres',
      'any.required': 'El nombre es obligatorio'
    }),

  email: joi.string()
    .pattern(new RegExp('^(?=.{1,75}$)[\\w.-]+@[A-Za-z\\d.-]+\\.[A-Za-z]{2,}$'))
    .required()
    .messages({
      'string.pattern.base': 'El email no es válido o supera los 75 caracteres',
      'any.required': 'El email es obligatorio'
    }),

  password: joi.string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base': 'La contraseña debe tener al menos 8 caracteres, incluir letras y números',
      'any.required': 'La contraseña es obligatoria',
      'string.empty': 'La contraseña no puede estar vacía',
    })
})

export default registerSchema
