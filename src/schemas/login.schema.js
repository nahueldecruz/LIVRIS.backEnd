import joi from 'joi'

const loginSchema = joi.object({
  email: joi.string()
    .pattern(new RegExp('^(?=.{1,75}$)[\\w.-]+@[A-Za-z\\d.-]+\\.[A-Za-z]{2,}$'))
    .required()
    .messages({
      'string.empty': 'El email no puede estar vacío',
      'any.required': 'El email es obligatorio',
      'string.pattern.base': 'El formato del email no es válido o supera los 75 caracteres'
    }),

  password: joi.string()
    .min(8)
    .required()
    .messages({
      'string.empty': 'La contraseña no puede estar vacía',
      'any.required': 'La contraseña es obligatoria',
      'string.min': 'La contraseña debe tener al menos 8 caracteres'
    })
})

export default loginSchema
