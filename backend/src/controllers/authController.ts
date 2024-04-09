import config from "config";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
} from "../service/user.service";

const privateKey = config.get<string>("privateKey");

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export async function googleOauthHandler(req: Request, res: Response) {
  // get the code from qs
  const code = req.query.code as string;

  try {
    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    // console.log({ id_token, access_token });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });
    //jwt.decode(id_token);

    // console.log({ googleUser });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    // upsert the user
    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );

    // console.log(user);

    // create an access token

    const accessToken = jwt.sign(
      {
        _id: user!._id,
        email: user!.email,
      },
      config.get("privateKey")!,
      {
        expiresIn: config.get("accessTokenTtl"),
      }
    );

    // create a refresh token
    const refreshToken = jwt.sign(
      {
        _id: user!._id,
      },
      config.get("privateKey")!,
      {
        expiresIn: config.get("refreshTokenTtl"),
      }
    );

    // set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // redirect back to client
    // console.log(req.headers.origin);
    const originAddress =
      req.query.origin ||
      req.headers.referer ||
      req.headers.origin ||
      req.get("host") ||
      req.headers.host ||
      req.hostname ||
      req.header("Origin") ||
      req.header("Host");

    // console.log(req);
    // res.redirect(config.get("origin"));
    res.send("<script>window.close();</script>");
  } catch (error) {
    console.error(error, "Failed to authorize Google user");
    return res.redirect(`${config.get("origin")}/oauth/error`);
  }
}
