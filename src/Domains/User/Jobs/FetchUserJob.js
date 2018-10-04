/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseJob = use("Src/Foundation/BaseJob");
const UserRepository = use("Src/Data/Repositories/UserRepository");

/**
 * Fetches a user.
 *
 * **Namespace**: `Src/Domains/User/FetchUserJob` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class FetchUserJob
 * @constructor
 */
class FetchUserJob extends BaseJob {
  constructor(params) {
    super(params);
  }

  /**
   * Contains code that will be ran when this job is invoked.
   *
   * @method handle
   *
   * @return {Object} Lucid/ORM
   */
  async handle() {
    const userRepo = new UserRepository();

    const user = await userRepo.find(this.params.id);

    return user.toJSON();
  }
}

module.exports = FetchUserJob;
