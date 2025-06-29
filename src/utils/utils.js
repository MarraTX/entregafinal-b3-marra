import bcrypt from "bcrypt";
import { dirname } from "path";
import { fileURLToPath } from "url";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateHash = async (password) =>
  await bcrypt.hash(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
  if (!user || !user.password || !password) {
    return false;
  }
  const result = bcrypt.compareSync(password, user.password.toString());
  return result;
};

export const passportCall = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
        return;
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).send({ message: "No autorizado" });
      return;
    }
    if (req.user.role != role) {
      res.status(403).send({ error: "No tienes permiso" });
      return;
    }
    next();
  };
};

export const generateOrderCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const randomLetters = Array.from(
    { length: 5 },
    () => letters[Math.floor(Math.random() * letters.length)]
  ).join("");

  const randomNumbers = Array.from(
    { length: 5 },
    () => numbers[Math.floor(Math.random() * numbers.length)]
  ).join("");

  return randomLetters + randomNumbers;
};
