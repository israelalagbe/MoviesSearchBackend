/**
 * A function for getting enviromental variable
 * @param {String} key
 * @param {String} defaultValue
 */
exports.env = (key, defaultValue) => {
  return process.env[key] || defaultValue;
};
