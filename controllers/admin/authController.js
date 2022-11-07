const adminModel = require("../../models/adminModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { statusCodeEnum } = require("../../utils/commonFun");
const {
  success,
  exception,
  error,
  successAuth,
} = require("../../models/apiResponses/apiReponseModel");
const { checkPassword } = require("../../utils/passwordCheck");
const { JWTSecret } = require("../../config/index");
const { signAccessToken } = require("../../middlewares/jwt");

exports.adminRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    }
    const { name, email, password } = req.body;
    const result = await adminModel.create({ name, email, password });

    if (result) {
      let data = {
        user: result._id,
      };

      return success(
        "User created. Please login.",
        data,
        statusCodeEnum.created,
        res,
        5
      );
    } else {
      return error(
        "Unable to create the user.",
        statusCodeEnum.internalServerError,
        res,
        { user: 0 }
      );
    }
  } catch (error) {
    console.error(error);
    return exception("", statusCodeEnum.internalServerError, res, error);
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }
    const { email, password } = req.body;
    let user = await adminModel
      .findOne({
        email: {
          $regex: new RegExp(`^${email}$`, "i"),
        },
      })
      .select("_id name email password")
      .lean();
    if (!user || Object.keys(user).length === 0) {
      return error("User does not exists.", statusCodeEnum.notFound, res, {});
    }

    const isPassword = await checkPassword(password, user.password);
    if (isPassword) {
      const _token = await signAccessToken(user.email);
      const cookiesOptions =
        process.env.NODE_ENV === "development"
          ? {
              httpOnly: true,
            }
          : {
              // httpOnly: true,
              secure: true,
              sameSite: true,
            };

      res.cookie("admin_access_token", _token, cookiesOptions);
      let data = {
        user: { _id: user._id, name: user.name, email: user.email },
      };

      return successAuth(
        "Login Successfully.",
        _token,
        data,
        statusCodeEnum.success,
        res,
        5
      );
    }
    return error("incorrect password.", statusCodeEnum.unauthorized, res, {});
  } catch (error) {
    console.error(error);
    return exception("", statusCodeEnum.internalServerError, res, error);
  }
};
