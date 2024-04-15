"use strict";
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { error } = require("../models/apiResponses/apiReponseModel");
const { statusCodeEnum } = require("../utils/commonFun");

const adminMiddleware = (req, res, next) => {
  if (
    req.cookies.admin_access_token ||
    req.cookies["admin_access_token"] ||
    req.headers.admin_access_token ||
    req.headers["admin_access_token"]
  ) {
    const token =
      req.cookies["admin_access_token"] ||
      req.headers["admin_access_token"] ||
      req.cookies.admin_access_token ||
      req.headers.admin_access_token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return error(
          "Please login again.",
          statusCodeEnum.badRequest,
          res,
          err
        );
      } else if (decoded) {
        req.user = decoded;
        next();
      } else {
        return error("Please login again.", statusCodeEnum.badRequest, res, {});
      }
    });
  } else {
    return error("Please login again.", statusCodeEnum.badRequest, res, {});
  }
};

const validateRequestMiddlware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(
      "Invalid Request.",
      statusCodeEnum.badRequest,
      res,
      errors.array()
    );
  }
  next();
};

module.exports = {
  adminMiddleware,
  validateRequestMiddlware,
};
