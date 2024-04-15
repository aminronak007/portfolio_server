const winston = require("winston");
require("winston-daily-rotate-file");
const basePath = "./logs/";

const filter = (level) =>
  winston.format((info) => {
    if (info.level === level) {
      return info;
    }
  })();

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  http: 5,
};

const dash = winston.createLogger({
  levels,
  transports: [
    new winston.transports.File({
      level: "error",
      filename: `${basePath}error.log`,
      format: winston.format.combine(
        filter("error"),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.timestamp} : ${info.message}`)
      ),
    }),
    new winston.transports.File({
      level: "fatal",
      filename: `${basePath}error.log`,
      format: winston.format.combine(
        filter("fatal"),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.printf((info) => `${info.timestamp} : ${info.message}`)
      ),
    }),
    new winston.transports.File({
      level: "info",
      filename: `${basePath}combined.log`,
      format: winston.format.combine(
        filter("info"),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.timestamp} : ${info.message}`)
      ),
    }),
    new winston.transports.File({
      level: "debug",
      filename: `${basePath}combined.log`,
      format: winston.format.combine(
        filter("info"),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.timestamp} : ${info.message}`)
      ),
    }),
    new winston.transports.File({
      filename: `${basePath}http.log`,
      level: "http",
      format: winston.format.combine(
        filter("http"),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.timestamp} : ${info.message}`)
      ),
    }),
  ],
});

//#region Methods
const info = (message, URL, extraPayload = {}) => {
  dash.info(
    `info: ${message}, RequestURL: ${URL}, OtherDetails: ${
      extraPayload == {} ? "" : extraPayload
    }`
  );
};
const error = (error, URL, extraPayload = {}) => {
  dash.error(
    `Error: ${error}, RequestURL: ${URL}, OtherDetails: ${
      extraPayload == {} ? "" : extraPayload
    }`
  );
};
const fatal = (error, URL, extraPayload = {}) => {
  dash.fatal(
    `Fatal: ${error}, RequestURL: ${URL}, OtherDetails: ${
      extraPayload == {} ? "" : extraPayload
    }`
  );
};
const logger = { info, error, fatal };

//#endregion

module.exports = {
  logger,
};
