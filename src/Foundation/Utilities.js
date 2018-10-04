/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
"use strict";

/**
 * The utilities class contains helper methods that may be used through out the framework.
 *
 * **Namespace**: `Src/Foundation/Utilities` <br />
 * **Singleton**: No <br />
 * **Alias**: None
 *
 * @class Utilities
 * @constructor
 */
class Utilities {
  /**
   * Turns the first character of a string to uppercase.
   *
   * @param {String} str - String to be converted to uppercase.
   *
   * @method uppercaseFirstChar
   *
   * @return {String}
   */
  static uppercaseFirstChar(str) {
    return str
      .charAt(0)
      .toUpperCase()
      .concat(str.slice(1, str.length));
  }
}

module.exports = Utilities;
