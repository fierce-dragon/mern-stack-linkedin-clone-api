import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../auth/passportHandler";

export class AuthController {
  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", (err, user, token) => {
      if (err) {
        return res.status(401).json({ message: "Error on token." });
      } else if (token?.stack) {
        return res.status(401).json({ message: token?.message + "." });
      } else if (!user) {
        return res.status(401).json({ message: "Token is invalid." });
      } else if (token.exp < Date.now()) {
        return res.status(401).json({ message: "Token has expired." });
      } else {
        return next();
      }
    })(req, res, next);
  }

  public authorizeJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", (err, user, jwtToken) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized." });
      }
      if (!user) {
        return res.status(401).json({ message: "Unauthorized." });
      } else {
        const scope = req.baseUrl.split("/").slice(-1)[0];
        const authScope = jwtToken.scope;
        if (authScope && authScope.indexOf(scope) > -1) {
          return next();
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }
    })(req, res, next);
  }
}
