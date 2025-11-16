import Joi from "joi";

const booksQuerySchema = Joi.object({
    page: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            "number.base": "El parámetro 'page' debe ser un número.",
            "number.min": "El parámetro 'page' debe ser mayor o igual a 1."
        }),
    
    maxResults: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(9)
        .messages({
            "number.base": "El parámetro 'maxResults' debe ser un número.",
            "number.min": "El parámetro 'maxResults' debe ser mínimo 1.",
            "number.max": "El parámetro 'maxResults' no puede superar 100."
        })
})
.options({ convert: true, stripUnknown: true });

export default booksQuerySchema