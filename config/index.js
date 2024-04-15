module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_URI,
  JWTSecret: process.env.JWT_SECRET,
};
