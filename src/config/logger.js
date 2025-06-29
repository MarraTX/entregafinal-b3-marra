import winston from "winston";

const personalizedLevels = {
  levels: {
    grave: 0,
    warn: 1,
    info: 2,
    leve: 3,
  },
  colors: {
    grave: "red",
    warn: "yellow",
    info: "blue",
    leve: "green",
  },
};

winston.addColors(personalizedLevels.colors);

export const logger = winston.createLogger({
  levels: personalizedLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      level: "leve",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, ...meta }) => {
          if (typeof message === "object") {
            message = JSON.stringify(message, null, 2);
          }
          return `${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
          }`;
        })
      ),
    }),
  ],
});

export const middLogg = (req, res, next) => {
  req.logger = logger;
  res.logger = logger;
  next();
};
