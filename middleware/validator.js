const Joi = require("joi");

module.exports = function (validationObject) {
  return async function (req, res, next) {
    try {
      await validationObject.validateAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        return res.status(400).send({ message: error.message });
      }
      console.error(error);
      return res
        .status(500)
        .send({ message: "Something went wrong during validation" });
    }
  };
};
