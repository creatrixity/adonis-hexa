/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseValidator = use("Src/Foundation/BaseValidator");

/**
 * Validates data for the creation of a new user.
 *
 * **Namespace**: `Src/Domains/User/Validators/UserValidator` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class UserValidator
 */
class UserValidator extends BaseValidator {
  /**
   * Contains validation rules fo creating a user.
   *
   * @method rules
   *
   * @return {Object} JSON
   */
  rules() {
    return {
      username: "min:6|unique:users",
      email: "required|email|unique:users",
      password: "required|min:6|max:30"
    };
  }
}

module.exports = UserValidator;
