/**
 * Team 2
 * CSC 648
 * Description: error handling
 */

const ExtendableError = require("./ExtendableError");

class ApiClientError extends ExtendableError {
  constructor(message) {
    super(message);
  }
}

module.exports = ApiClientError;