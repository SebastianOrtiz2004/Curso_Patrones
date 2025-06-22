const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    request.token = token;
  }

  next()
}

const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const errorInfo = {
      name: error.name,
      message: error.message,
      code: error.code,
      status: error.status || error.statusCode
    }
    console.error('Error Info:', errorInfo);
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    const value = error.keyValue[field];
    return res.status(400).json({
      error: `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`
    });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: `Invalid token`,
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).send({
      status: 'error',
      message: "Validation Error",
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}