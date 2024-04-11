import config from "config";
import { CookieOptions, Request, Response } from "express";
import { redis } from "..";
import { CreateAccessRefreshToken, otpSender } from "../service/auth.service";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
} from "../service/user.service";

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
    if (!user) return null;

    const { accessToken, refreshToken } = CreateAccessRefreshToken(
      user._id,
      undefined,
      user.email
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

export async function phoneLoginHandler(req: Request, res: Response) {
  const { phone, value } = req.body;

  redis.get(phone).then(async (result) => {
    // console.log(result);
    if (result === value) {
      const user = await findAndUpdateUser(
        {
          phone,
        },
        {
          phone,
        },
        {
          upsert: true,
          new: true,
        }
      );

      const { accessToken, refreshToken } = CreateAccessRefreshToken(
        user!._id,
        user?.phone
      );

      res.cookie("accessToken", accessToken, accessTokenCookieOptions);

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
}

export async function otpSenderHandler(req: Request, res: Response) {
  const { phoneNumber } = req.body;

  await otpSender(phoneNumber);

  res.json({ success: true });
}
