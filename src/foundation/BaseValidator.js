/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

const Validator = use("Validator");

/**
 * BaseValidator is the core validation class.
 * It allows us validate data in a decoupled and scalable fashion.
 * This class may be injected as a dependency for validation tasks.
 *
 * **Namespace**: `Src/Foundation/BaseValidator` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class BaseValidator
 * @constructor
 */
class BaseValidator {
  constructor(data) {
    this.data = data;
  }

  /**
   * Allows validation rules to be compared against provided data.
   *
   * @method validate
   *
   * @param {Object} data - Data payload to be validated by class.
   *
   * @return {Boolean}
   */
  async validate(data) {
    return await Validator.validate(data, this.rules());
  }
}

module.exports = BaseValidator;
