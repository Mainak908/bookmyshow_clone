import axios from "axios";
import config from "config";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { stringify } from "qs";
import { redis } from "..";
import UserModel from "../models/user";
import { getTokenParams, otpSender } from "../service/auth.service";
import { findAndUpdateUser } from "../service/user.service";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
};

interface JwtPayload {
  email: string;
  name: string;
  picture: string;
}
interface JwtPayload2 {
  user: any;
}
const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};
const authParams = stringify({
  client_id: config.get("clientId"),
  redirect_uri: config.get("redirectUrl"),
  response_type: "code",
  scope: "openid profile email",
  access_type: "offline",
  state: "standard_oauth",
  prompt: "consent",
});

export async function phoneLoginHandler(req: Request, res: Response) {
  const { phone, value } = req.body;

  redis.get(phone).then(async (result) => {
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
      if (!user) return;
      const refreshToken = jwt.sign(
        {
          _id: user._id,
        },
        config.get("privateKey")!,
        {
          expiresIn: config.get("refreshTokenTtl"),
        }
      );
      user.refresh_token = refreshToken;
      await user.save();

      const accessToken = jwt.sign(
        {
          _id: user._id,
          phone,
        },
        config.get("privateKey")!,
        {
          expiresIn: config.get("accessTokenTtl"),
        }
      );

      res
        .cookie("accessToken", accessToken, accessTokenCookieOptions)
        .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
        .json({ success: true, data: user });
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

export async function logOutHandler(req: Request, res: Response) {
  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ success: true });
}

export async function tokenSenderHandler(req: Request, res: Response) {
  const { code } = req.query;
  if (!code)
    return res
      .status(400)
      .json({ message: "Authorization code must be provided" });
  try {
    // Get all parameters needed to hit authorization server
    const tokenParam = getTokenParams(code);
    // Exchange authorization code for access token (id token is returned here too)
    const {
      data: { id_token },
    } = await axios.post(`${config.get("tokenUrl")}?${tokenParam}`);
    if (!id_token) return res.status(400).json({ message: "Auth error" });
    // Get user info from id token
    const { email, name, picture } = jwt.decode(id_token) as JwtPayload;

    const user = await findAndUpdateUser(
      {
        email,
      },
      {
        email,
        name,
        image: picture,
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (!user) return;
    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      config.get("privateKey")!,
      {
        expiresIn: config.get("refreshTokenTtl"),
      }
    );
    user.refresh_token = refreshToken;
    await user.save();

    const accessToken = jwt.sign(
      {
        _id: user._id,
        email,
        name,
        picture,
      },
      config.get("privateKey")!,
      {
        expiresIn: config.get("accessTokenTtl"),
      }
    );

    res
      .cookie("accessToken", accessToken, accessTokenCookieOptions)
      .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
      .json({
        user,
      });
  } catch (err: any) {
    console.log("Error: ", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
}

export function urlSender(_: Request, res: Response) {
  res.json({
    url: `${config.get("authUrl")}?${authParams}`,
  });
}

export async function loggedinCheckHandler(req: Request, res: Response) {
  try {
    const { accessToken } = req.cookies;
    // console.log("accessssss", accessToken);
    if (!accessToken) return res.json({ loggedIn: false });

    const user = jwt.verify(
      accessToken,
      config.get("privateKey") as string
    ) as JwtPayload2;

    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false }).status(401);
  }
}
interface IdecodedToken {
  _id: string;
}
export const refreshAccessToken = async (req: Request, res: Response) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.json({ message: "unauthorized request" }).status(401);
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      config.get("privateKey")!
    ) as IdecodedToken;

    const user = await UserModel.findById(decodedToken._id);

    if (!user) {
      return res.json({ message: "Invalid refresh token" }).status(401);
    }

    if (incomingRefreshToken !== user?.refresh_token) {
      res.json({ message: "Refresh token is expired or used" }).status(401);
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const accessToken = jwt.sign(
      {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        picture: user.image,
      },
      config.get("privateKey")!,
      {
        expiresIn: config.get("accessTokenTtl"),
      }
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)

      .json({ message: "access token refreshed" });
  } catch (error) {
    console.log("something error happend at refreshAccessToken");
  }
};
