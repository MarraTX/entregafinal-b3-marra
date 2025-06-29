import winston from "winston";
import config from "./config.js";

// Define standard log levels and colors
const logLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warn: "yellow",
    info: "blue",
    http: "cyan",
    debug: "green",
  },
};

winston.addColors(logLevels.colors);

// Development logger
const devLogger = winston.createLogger({
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
  ],
});

// Production logger
const prodLogger = winston.createLogger({
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "./errors.log", level: "error" }),
  ],
});

// Select logger based on environment
export const logger = config.mode === "prod" ? prodLogger : devLogger;

export const middLogg = (req, res, next) => {
  req.logger = logger;
  // Add a log for each request
  req.logger.http(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
};
