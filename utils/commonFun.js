const statusCodeEnum = {
  success: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  requestTimeout: 408,
  conflict: 409,
  payLoadTooLarge: 411,
  unsupportedMediaType: 415,
  unprocesssbleEntity: 422,
  internalServerError: 500,
  serviceUnavilable: 503,
};

module.exports = { statusCodeEnum };
