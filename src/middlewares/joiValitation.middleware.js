export function joiValidationMiddleware({ body, params, query }) {
  return (request, response, next) => {
    const validationTargets = [
      { data: request.body, schema: body, location: "bodyValidated" },
      { data: request.params, schema: params, location: "paramsValidated" },
      { data: request.query, schema: query, location: "queryValidated" }
    ]

    const errors = {}

    for (const { data, schema, location } of validationTargets) {
      if (!schema) continue

      const { value, error } = schema.validate(data, { 
        abortEarly: false, 
        convert: true,
        stripUnknown: true
      })

      if (error) {
        for (const detail of error.details) {
          const field = detail.path.join(".")
          errors[field] = detail.message
        }
      } else {
        request[location] = value;
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