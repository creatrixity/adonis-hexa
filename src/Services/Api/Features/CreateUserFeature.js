/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseFeature = use("Src/Foundation/BaseFeature");
const UserRepository = use("Src/Data/Repositories/UserRepository");
const UserValidator = use("Src/Domains/User/Validators/UserValidator");

/**
 * Creates a new user.
 *
 * **Namespace**: `Src/Services/Api/Features/CreateUserFeature` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class CreateUserFeature
 */
class CreateUserFeature extends BaseFeature {
  constructor(params) {
    super(params);
  }
  /**
   * Contains code that will be ran when this feature is invoked.
   *
   * @method handle
   *
   * @return {Object} JSON
   */
  async handle() {
    const { data } = this.params;

    const validation = await new UserValidator().validate(data);

    if (validation.fails()) return validation.messages();

    const user = await this.run("User/Jobs/CreateUserJob", {
      data
    });

    return {
      user
    };
  }
}

module.exports = CreateUserFeature;
