/**
 * Team 2
 * CSC 648
 * Description: error handling
 */

const ExtendableError = require("./ExtendableError");

class ApiNotFoundError extends ExtendableError {
  constructor(message) {
    super(message);
  }
}

module.exports = ApiNotFoundError;