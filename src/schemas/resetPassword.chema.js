import joi from 'joi'

const resetPasswordSchema = joi.object({
    "newPassword": joi.string()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
          'string.pattern.base': 'La contraseña debe tener al menos 8 caracteres, incluir letras y números',
          'any.required': 'La contraseña es obligatoria',
          'string.empty': 'La contraseña no puede estar vacía',
    }),

    "confirmPassword": joi.string()
        .valid(joi.ref('newPassword'))
        .required()
        .messages({
        'any.only': 'Las contraseñas no coinciden',
        'string.empty': 'Debe confirmar la contraseña',
    })
})

export default resetPasswordSchema