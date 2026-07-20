const errorHandler = (err, req, res, next) => {
  // log full error stack for server logs (safe to reveal in logs)
  console.error(err.stack || err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  res.json({
    success: false,
    message: err.message,
  });
};

export { errorHandler };
