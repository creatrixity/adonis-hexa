/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const DOMAINS_NAMESPACE = "Src/Domains";

/**
 * BaseFeature is the core feature class.
 * It allows use of the command-bus architecture
 * concept of firing job commands through the `run` method abstraction.
 *
 * **Namespace**: `Src/Foundation/BaseController` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class BaseFeature
 * @constructor
 */
class BaseFeature {
  constructor(params) {
    this.params = params;
  }
  /**
   * Invokes the `handle` method of a job that was passed in. Provides params to the Feature class.
   *
   * @method run
   *
   * @param {String} job - The feature to be served. Could pass in "ListUsersJob".
   * @param {Object} params - Argument parameters supplied to provided job.
   *
   * @return {Class}
   */
  run(job, params) {
    let resolvedJob = use(`${DOMAINS_NAMESPACE}/${job}`);

    if (typeof params == "object") {
      return new resolvedJob(params).handle({
        ...params
      });
    }

    return new resolvedJob().handle();
  }
}

module.exports = BaseFeature;
