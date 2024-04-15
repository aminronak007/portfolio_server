const { logger } = require("../../utils/logger");

/*
Code:
0 = Error
5 = Success
6 = Logout
*/

/**
 *
 * @param {string} message
 * @param {array} results
 * @param {number} statusCode
 * @param {object} responseObj
 * @param {number} code
 */

exports.success = (message, results, statusCode, responseObj, code) => {
  return responseObj.status(statusCode).json({
    data: results,
    error: false,
    message: message,
    code: code,
  });
};

/**
 *
 * @param {string} message
 * @param {array} results
 * @param {number} statusCode
 * @param {object} responseObj
 * @param {number} code
 */

exports.successAuth = (
  message,
  token,
  results,
  statusCode,
  responseObj,
  code
) => {
  return responseObj.status(statusCode).json({
    data: results,
    _token: token,
    error: false,
    message: message,
    code: code,
  });
};

/**
 *
 * @param {string} message
 * @param {object | array} results
 * @param {number} statusCode
 * @param {object} responseObj
 * @param {object} err
 */

exports.error = (message, statusCode, responseObj, err = {}) => {
  if (err != {})
    logger.error(message, responseObj.originalUrl, JSON.stringify(err));

  return responseObj.status(statusCode).json({
    error: true,
    message: message,
    code: 0,
  });
};

/**
 *
 * @param {string} message
 * @param {object} errorData
 * @param {number} statusCode
 * @param {object} responseObj
 */

exports.exception = (message, statusCode, responseObj, errorData) => {
  message = message == "" ? errorData.message : message;
  logger.fatal(message, responseObj.originalUrl, errorData);
  return responseObj.status(statusCode).json({
    error: true,
    message: message,
    details: errorData,
    code: 0,
  });
};
