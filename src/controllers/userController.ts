import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt-nodejs";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";

import "../auth/passportHandler";

export class UserController {
  public async registerUser(req: Request, res: Response): Promise<any> {
    await check("email", "Email cannot be blank.").not().isEmpty().run(req);
    await check("email", "Email is not valid.").isEmail().run(req);
    await check("password", "Password cannot be blank.")
      .not()
      .isEmpty()
      .run(req);
    await check("password", "Password's length must be at least 8.")
      .isLength({ min: 8 })
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0].msg,
      });
    }

    const { email, password }: IUser = req.body;

    const hashedPassword = bcrypt.hashSync(password);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (user !== null) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    try {
      await User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
      });
    } catch (e) {
      return res.status(500).json({ message: "Error while register user." });
    }

    const token = jwt.sign({ email: email.toLowerCase() }, JWT_SECRET);
    return res.status(200).send({ token });
  }

  public async authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await check("email", "Email cannot be blank.").not().isEmpty().run(req);
    await check("email", "Email is not valid.").isEmail().run(req);
    await check("password", "Password cannot be blank.")
      .not()
      .isEmpty()
      .run(req);
    await check("password", "Password's length must be at least 8.")
      .isLength({ min: 8 })
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0].msg,
      });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      } else {
        const token = jwt.sign(
          { email: user.email, exp: Date.now() + 86400000 },
          JWT_SECRET
        );
        return res.status(200).json({ token: token });
      }
    })(req, res);
  }

  public checkValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password }: IUser = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required." });
    } else if (!password) {
      return res.status(422).json({ message: "Password is required." });
    }

    const errors = validationResult(req)
      .array()
      .map((error) => error.param);
    if (errors.includes("email")) {
      return res.status(422).json({ message: "Email is invalid." });
    } else if (errors.includes("password")) {
      return res
        .status(422)
        .json({ message: "Password must be at least 8 characters." });
    }

    return next();
  }
}
