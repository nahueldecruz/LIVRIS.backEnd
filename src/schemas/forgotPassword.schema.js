import joi from 'joi'

const forgotPasswordSchema = joi.object({
  email: joi.string()
    .pattern(new RegExp('^(?=.{1,75}$)[\\w.-]+@[A-Za-z\\d.-]+\\.[A-Za-z]{2,}$'))
    .required()
    .messages({
      'string.empty': 'El email no puede estar vacío',
      'any.required': 'El email es obligatorio',
      'string.pattern.base': 'El formato del email no es válido o supera los 75 caracteres'
    })
})

export default forgotPasswordSchema
