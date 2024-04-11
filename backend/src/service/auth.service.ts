import axios from "axios";
import config from "config";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { redis } from "../index";

const otp = otpGenerator.generate(6, {
  digits: true,
  lowerCaseAlphabets: false,
  specialChars: false,
  upperCaseAlphabets: false,
});

export const otpSender = async (mobileNumber: string) => {
  try {
    await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization:
          "PDKi6yJY83xUbvkHplX79me0jWacGguRLEVAqonNCzIsQt4wZOPejSn5yCKR2XizZo4vVaBm0qbT369x",
        variables_values: `${otp}`,
        route: "otp",
        numbers: mobileNumber,
      },
    });
    redis.set(mobileNumber, otp, "EX", 60 * 5).then(() => {
      console.log("value set", mobileNumber, otp);
    });
  } catch (error: any) {
    console.log(error.response.data);
  }
};

export const CreateAccessRefreshToken = (id: any, email?: string) => {
  const accessToken = jwt.sign(
    {
      _id: id,
      email: email,
    },
    config.get("privateKey")!,
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );

  // create a refresh token
  const refreshToken = jwt.sign(
    {
      _id: id,
    },
    config.get("privateKey")!,
    {
      expiresIn: config.get("refreshTokenTtl"),
    }
  );

  return { accessToken, refreshToken };
};
