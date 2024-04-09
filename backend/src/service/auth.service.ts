import axios from "axios";

import otpGenerator from "otp-generator";

const otp = otpGenerator.generate(6, {
  digits: true,
  lowerCaseAlphabets: false,
  specialChars: false,
  upperCaseAlphabets: false,
});

export const otpSender = async () => {
  const mobileNumber = "6294374869";

  const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
    params: {
      authorization:
        "PDKi6yJY83xUbvkHplX79me0jWacGguRLEVAqonNCzIsQt4wZOPejSn5yCKR2XizZo4vVaBm0qbT369x",
      variables_values: `${otp}`,
      route: "otp",
      numbers: mobileNumber,
    },
  });
};
