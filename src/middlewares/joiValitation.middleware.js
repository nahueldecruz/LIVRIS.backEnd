export function joiValidationMiddleware({ body, params, query }) {
  return (request, response, next) => {
    const validationTargets = [
      { data: request.body, schema: body },
      { data: request.params, schema: params },
      { data: request.query, schema: query }
    ]

    const errors = {}

    for (const { data, schema } of validationTargets) {
      if (!schema) continue

      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        for (const detail of error.details) {
          const field = detail.path.join('.')
          errors[field] = detail.message;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return response.status(400).json({ 
        ok: false, 
        message: null,
        errors
     })
    }

    next()
  }
}

export default joiValidationMiddleware