import bcrypt from "bcrypt";
import { type Request } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { type IUser } from "../../user/user.dto";
import * as userService from "../../user/user.service";
require('dotenv').config()

const isValidPassword = async function (value: string, password: string) {
  const compare = await bcrypt.compare(value, password);
  return compare;
};
console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
export const initPassport = (): void => {
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWT_ACCESS_SECRET || "default_secret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token: any, done) => {
        try {
          if (!token) {
            return done(createError(401, "Token missing"));
          }
           // Check token structure
          done(null, token); // Pass the token to req.user
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // user login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail(email, true);
          if (user == null) {
            done(createError(401, "Invalid email or password"), false);
            return;
          }

          const validate = await isValidPassword(password, user.password);
          if (!validate) {
            done(createError(401, "Invalid email or password"), false);
            return;
          }
          const { password: _p, ...result } = user;
          const userResult = { ...result, password: user.password }; // Ensure the password is included
          done(null, userResult, { message: "Logged in Successfully" });
        } catch (error: any) {
          done(createError(500, error.message));
        }
      }
    )
  );
};

export const createUserTokens = (user: Omit<IUser, "password">) => {
  const accessTokenSecret = process.env.JWT_ACCESS_SECRET ?? "";
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET ?? "";
  console.log("accessTokenSecret", accessTokenSecret);  
  console.log("refreshTokenSecret", refreshTokenSecret);  
  const token = jwt.sign(user, accessTokenSecret);
  const refreshToken = jwt.sign(user, refreshTokenSecret);
  return { accessToken: token, refreshToken };
};

export const decodeToken = (token: string) => {
  const decode = jwt.decode(token);
  return decode as IUser;
};