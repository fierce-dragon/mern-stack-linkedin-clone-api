import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err: any, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(undefined, false, {
          message: "Invalid email or password.",
        });
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, {
          message: "Invalid email or password.",
        });
      });
    });
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtToken, done) => {
      User.findOne({ email: jwtToken.email }, (err: any, user: any) => {
        if (err) {
          return done(err, undefined);
        } else if (user) {
          return done(undefined, user, jwtToken);
        } else {
          return done(undefined, undefined);
        }
      });
    }
  )
);
