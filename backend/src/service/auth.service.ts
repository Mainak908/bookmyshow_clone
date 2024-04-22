import axios from "axios";
import config from "config";
import otpGenerator from "otp-generator";
import { stringify } from "qs";
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
        authorization: process.env.OTPAUTHKEY,
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

export const getTokenParams = (code: any) =>
  stringify({
    client_id: config.get("clientId"),
    client_secret: config.get("clientSecret"),
    code,
    grant_type: "authorization_code",
    redirect_uri: config.get("redirectUrl"),
  });
