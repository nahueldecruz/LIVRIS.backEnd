import joi from 'joi'

const statusUserBookSchema = joi.object({
    status: joi.string()
        .valid("read", "want_to_read", "reading")
        .required()
        .messages({
            'any.only': 'El estado debe ser "read", "want_to_read" o "reading"',
            'string.empty': 'El estado no puede estar vacío',
            'any.required': 'El estado es obligatorio'
        })
})

export default statusUserBookSchema
