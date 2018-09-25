/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseFeature = use("Src/Foundation/BaseFeature");
const UserRepository = use("Src/Data/Repositories/UserRepository");

/**
 * Lists all the users.
 *
 * **Namespace**: `Src/Services/Api/Features/FetchUserFeature` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class FetchUserFeature
 */
class FetchUserFeature extends BaseFeature {
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
    return this.run("User/Jobs/FetchUserJob", {
      id: this.params.id
    });
  }
}

module.exports = FetchUserFeature;
