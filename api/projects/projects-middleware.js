// add middlewares here related to projects

const logger = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
};

module.exports = logger;
