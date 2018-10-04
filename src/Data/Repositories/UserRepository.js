/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const Repository = use("Src/Data/Repositories/Repository");
const User = use("App/Models/User");

/**
 * Contains methods specific for the User domain.
 *
 * **Namespace**: `Src/Data/Repositories/UserRepository` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class UserRepository
 * @constructor
 */
class UserRepository extends Repository {
  constructor() {
    /**
     * We provide the User Lucid model as the argument
     * for the Repository parent class constructor.
     * We also make this model accessible through out this class.
     */
    super(User);
    this.model = User;
  }
}

module.exports = UserRepository;
