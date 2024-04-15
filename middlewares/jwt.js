const jwt = require("jsonwebtoken");

module.exports = {
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = { user };
      // console.log(payload);
      const options = {
        expiresIn: "1d",
      };
      jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      return res.json({ message: "Access Denied" });

    const authHeader = req.headers["authorization"];

    const token = authHeader;

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return res.json({ message: err });
      if (payload) {
        req.user = payload;
        next();
      }
    });
  },
};
