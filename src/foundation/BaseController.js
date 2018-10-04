/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

/**
 * BaseController is the core controller class.
 * It allows use of the command-bus architecture
 * concept of firing job commands through the `serve` method abstraction.
 *
 * **Namespace**: `Src/Foundation/BaseController` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class BaseController
 * @constructor
 */
class BaseController {
  /**
   * Invokes the `handle` method of a feature that was passed in. Provides params to the Feature class.
   *
   * @method serve
   *
   * @param {String} feature - The feature to be served. Could pass in "CreateUserFeature".
   * @param {Object} params - Argument parameters supplied to provided feature.
   *
   * @return {Class}
   */
  serve(feature, params) {
    let resolvedFeature = use(`Src/Services/${feature}`);

    if (typeof params == "object") {
      return new resolvedFeature(params).handle({
        ...params
      });
    }

    return new resolvedFeature().handle();
  }
}

module.exports = BaseController;
