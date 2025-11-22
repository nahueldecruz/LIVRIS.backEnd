import joi from 'joi'

export const newReviewSchema = joi.object({
  user_id: joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El ID de usuario debe ser un número',
      'number.integer': 'El ID de usuario debe ser un número entero',
      'any.required': 'El ID de usuario es obligatorio'
  }),

  book_id: joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El ID del libro debe ser un número',
      'number.integer': 'El ID del libro debe ser un número entero',
      'any.required': 'El ID del libro es obligatorio'
  }),

  content: joi.string()
    .max(1000)
    .messages({
      'string.base': 'El contenido debe ser un texto',
      'string.max': 'El contenido no puede superar los 1000 caracteres'
  }),

  rating: joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      'number.base': 'La calificación debe ser un número',
      'number.integer': 'La calificación debe ser un número entero',
      'number.min': 'La calificación mínima es 1',
      'number.max': 'La calificación máxima es 5',
      'any.required': 'La calificación es obligatoria'
  })
})

export const updateReviewSchema = joi.object({
  content: joi.string()
    .max(1000)
    .messages({
      'string.base': 'El contenido debe ser un texto',
      'string.max': 'El contenido no puede superar los 1000 caracteres'
  }),

  rating: joi.number()
    .integer()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'La calificación debe ser un número',
      'number.integer': 'La calificación debe ser un número entero',
      'number.min': 'La calificación mínima es 1',
      'number.max': 'La calificación máxima es 5'
  })
})