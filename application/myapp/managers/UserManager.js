/**
 * Team 2
 * CSC 648
 * Description: User manager class that provides
 * several functionalities associated with user.
 * Create, get, or manipulate user data.
 */

const db = require("../conf/databseSetup.js");
const PasswordHasher = require("../api/PasswordHasher");
const ApiClientError = require("../errors/ApiClientError");

class UserManager {
  async createUser(password, email) {
    try {
      const queryIfExists = `SELECT * FROM Users WHERE email = '${email}'`
      await db.query(queryIfExists)
      .then(([rows]) => {
        if(rows[0]){
          throw new ApiClientError(`A user with username "${email}" already exists.`);
        }
      })
      // Create user and user options in transaction
      const hashedPassword = await PasswordHasher.hash(password);
      const queryprompt = `INSERT INTO Users (email, password, date_time) VALUES ('${email}', '${hashedPassword}', NOW())`;
      await db.query(queryprompt)
    } catch(e) {
      throw e;
    }
  }

  async getUserByEmail(email) {
    try {
      const getUserAndOptionsByUserId = `SELECT email FROM Users WHERE email = '${email}'`;
      
      const user = await db.query(getUserAndOptionsByUserId);
      if (!user) {
        return null;
      }
      return user;
    } catch(e) {
      throw e;
    }
  }

  async loginUser(email, password) {
    try {
      const getUserIdAndPasswordByUsername = `SELECT email, password FROM Users WHERE email = '${email}'`;
     
      const user = await db.query(getUserIdAndPasswordByUsername)
      .then(([rows]) => {
        return rows[0]
      })
      if (!user) {
        return null;
      }

      if (!await PasswordHasher.verify(password, user.password)) {
        return null;
      }
      return await this.getUserByEmail(user.email);
    } catch(e) {
      throw e;
    }
  }

  async changePassword(email, new_password, old_password) {
    try {
      const getUserIdAndPasswordByUsername = `SELECT email, password FROM Users WHERE email = '${email}'`;
     
      const user = await db.query(getUserIdAndPasswordByUsername)
      .then(([rows]) => {
        return rows[0];
      })
     
      if (!await PasswordHasher.verify(old_password, user.password)) {
        console.log("Old Password is incorrect")
        return null;
      }
      const hashedPassword = await PasswordHasher.hash(new_password);
      const updatePword = `UPDATE Users
      SET password = '${hashedPassword}'
      WHERE email ='${email}'`;
     
       await db.query(updatePword)
    } catch(e) {
      throw e;
    }
  }

  async changeEmail(old_email, new_email, password) {
    try {
      const getUserIdAndPasswordByUsername = `SELECT email, password FROM Users WHERE email = '${old_email}'`;
     
      const user = await db.query(getUserIdAndPasswordByUsername)
      .then(([rows]) => {
        return rows[0];
      })
      
      if (!await PasswordHasher.verify(password, user.password)) {
        console.log("Incorrect Password")
        return null;
      }
      
      const updateEmail = `UPDATE Users SET email = '${new_email}' WHERE email ='${old_email}'`;
      console.log(updateEmail)
       await db.query(updateEmail)
    } catch(e) {
      throw e;
    }
  }

}

module.exports = new UserManager();