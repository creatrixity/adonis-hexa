/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

/**
 * BaseJob is the core job class.
 * It makes any arguments passed from the Feature class available to the rest of the class members.
 *
 * **Namespace**: `Src/Foundation/BaseJob` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class BaseJob
 * @constructor
 */
class BaseJob {
  constructor(params) {
    this.params = params;
  }
}

module.exports = BaseJob;
