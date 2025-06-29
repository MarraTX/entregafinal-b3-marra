import passport from "passport";
import jwt from "passport-jwt";
import config from "../config/config.js";

const JWT_PRIVATE_KEY = config.JWT_PRIVATE_KEY;

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.signedCookies && req.signedCookies["token"]) {
    token = req.signedCookies["token"];
  } else if (req && req.cookies && req.cookies["token"]) {
    token = req.cookies["token"];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromAuthHeaderAsBearerToken(),
          cookieExtractor,
        ]),
        secretOrKey: JWT_PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export default initializePassport;
