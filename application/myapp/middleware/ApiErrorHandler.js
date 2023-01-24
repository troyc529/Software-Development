/**
 * Team 2
 * CSC 648
 * Description: provides error handling
 */

const JoiValidationError = require("joi").ValidationError;
const ApiClientError = require("../errors/ApiClientError");
const ApiUnauthorizedError = require("../errors/ApiUnauthorizedError");
const ApiForbiddenError = require("../errors/ApiForbiddenError");
const ApiNotFoundError = require("../errors/ApiNotFoundError");

module.exports = function (err, req, res, next) {
  if (res.headersSent) {
    return next();
  }

  console.error(err);

  switch (true) {
    case err instanceof JoiValidationError: {
      const errorMessage = err.details
        .map((detail) => detail.message)
        .join(", ");
      res.status(400).json({
        error: errorMessage,
      });
      break;
    }
    case err instanceof ApiClientError: {
      res.status(400).json({
        error: err.message,
      });
      break;
    }
    case err instanceof ApiUnauthorizedError: {
      res.status(401).json({
        error: err.message,
      });
      break;
    }
    case err instanceof ApiForbiddenError: {
      res.status(403).json({
        error: err.message,
      });
      break;
    }
    case err instanceof ApiNotFoundError: {
      res.status(404).json({
        error: err.message,
      });
      break;
    }
    default: {
      res.status(500).json({
        error: "Internal server error.",
      });
      break;
    }
  }
};