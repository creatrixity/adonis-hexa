/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const BaseController = use("Src/Foundation/BaseController");

/**
 * Handles requests for the User domain.
 *
 * **Namespace**: `Src/Services/Api/Http/Controllers/UserController` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class UserController
 */
class UserController extends BaseController {
  /**
   * Returns a list of all users.
   *
   * @method index
   *
   * @param {Object} Object.request
   * @param {Object} Object.params
   *
   * @return {Object} Lucid/ORM
   */
  index({ request, params }) {
    return this.serve("Api/Features/ListUsersFeature", {
      params,
      request
    });
  }

  /**
   * Returns a single user.
   *
   * @method index
   *
   * @param {Object} Object.params
   *
   * @return {Object} JSON
   */
  show({ params }) {
    return this.serve("Api/Features/FetchUserFeature", {
      id: params.id
    });
  }

  /**
   * Updates a single user by id.
   *
   * @method index
   *
   * @param {Object} Object.request
   * @param {Object} Object.auth
   *
   * @return {Object} JSON
   */
  store({ request, auth }) {
    return this.serve("Api/Features/CreateUserFeature", {
      data: request.all()
    });
  }
}

module.exports = UserController;
