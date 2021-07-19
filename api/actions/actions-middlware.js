// add middlewares here related to actions
function errorHandler(error, req, res, next) {
  if (req.body == null || undefined) {
    return res.status(500).json(error.message);
  }
  return next();
}

module.exports = errorHandler;
