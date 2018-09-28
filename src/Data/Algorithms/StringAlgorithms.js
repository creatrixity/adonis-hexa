/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

/**
 * The StringAlgorithms class is an example of usage of Data layer algorithms.
 *
 * **Namespace**: `Src/Data/Algorithms/StringAlgorithms` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class StringAlgorithms
 * @constructor
 */
class StringAlgorithms {
  /**
   * Converts the first letter of a string to all caps.
   *
   * @param {String} str - String to be converted to uppercase.
   *
   * @method transformLeadToUppercase
   *
   * @return {String}
   */
  static transformLeadToUppercase(str) {
    return str
      .charAt(0)
      .toUpperCase()
      .concat(str.slice(1, str.length));
  }
}

module.exports = StringAlgorithms;
