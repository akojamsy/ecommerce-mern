const NotFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  //   Duplicate key error
  if (err.name === 11000) {
    message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    statusCode = 400;
  }

  //   jwt error
  if (err.name === "JsonWebTokenError") {
    message = "Incomplete credentials provided";
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : null,
  });
};

module.exports = { NotFound, errorHandler };
