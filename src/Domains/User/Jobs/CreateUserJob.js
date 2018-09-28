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
 * Creates a new user.
 *
 * **Namespace**: `Src/Domains/User/CreateUserJob` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class CreateUserJob
 * @constructor
 */
class CreateUserJob extends BaseJob {
  constructor(params) {
    super(params);
  }

  /**
   * Contains code that will be ran when this job is invoked.
   *
   * @method handle
   *
   * @param {Object} Object.request
   *
   * @return {Object} Lucid/ORM
   */
  async handle() {
    const userRepo = new UserRepository();

    return await userRepo.findOrCreate(this.params.data);
  }
}

module.exports = CreateUserJob;
