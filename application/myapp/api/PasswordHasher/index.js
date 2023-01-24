/**
 * Team 2
 * CSC 648
 * Description: provides functions for hashing and verifying passwords
 */


const bcrypt = require("bcrypt");
const { Blob } = require("buffer");
const ApiClientError = require("../../errors/ApiClientError");

class PasswordHasher {
  constructor() {
    this.saltRounds = 10; // Recommended minimum 10 by OWASP https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
    this.maxPasswordByteSize = 72; // bcrypt only uses up to 72 bytes of the input string
  }

  hash(password) {
    if (new Blob([password]).size > this.maxPasswordByteSize) {
      throw new ApiClientError(`Password cannot be more than ${this.maxPasswordByteSize} bytes in size.`);
    } else {
      return bcrypt.hash(password, this.saltRounds);
    }
  }

  verify(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = new PasswordHasher();