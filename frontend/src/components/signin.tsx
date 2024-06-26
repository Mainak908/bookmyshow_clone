"use client";
import { AuthContext } from "@/providers";
import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { InputOTPWithSeparator } from "./otpscreen";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

const SignInModal = ({ togglefn }: any) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [otpScreen, setOtpScreen] = useState(false);
  const { checkLoginState, loggedIn } = useContext(AuthContext);

  // Define window features
  const screenWidth = window.screen.availWidth;
  const screenHeight = window.screen.availHeight;

  const windowWidth = 600;
  const windowHeight = 650;

  const leftPosition = (screenWidth - windowWidth) / 2;
  const topPosition = (screenHeight - windowHeight) / 2;

  const windowFeatures =
    `width=${windowWidth},height=${windowHeight},` +
    `left=${leftPosition},top=${topPosition},` +
    `menubar=no,toolbar=no,resizable=yes,scrollbars=no`;

  const handlePhoneNumberChange = (e: any) => {
    const { value } = e.target;
    setPhoneNumber(value.slice(0, 10));
  };
  const Sendotp = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/generateOTP`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber }),
        }
      );
      setOtpScreen((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      // Gets authentication url from backend server
      const {
        data: { url },
      } = await axios.get(`${serverUrl}/api/v1/url`);

      window.open(url, "_blank", windowFeatures);

      const handleWindowMessage = async (event: any) => {
        if (event.origin !== `${process.env.NEXT_PUBLIC_CLIENT_ENDPOINT}`) {
          return;
        }
        const { data } = event;

        if (!data.source) {
          await axios.get(`${serverUrl}/api/v1/token${data}`, {
            withCredentials: true,
          });
          checkLoginState();
          togglefn((prev) => !prev);
        }
      };

      window.addEventListener("message", handleWindowMessage);

      // Clean up the listener when the component unmounts
      return () => window.removeEventListener("message", handleWindowMessage);
    } catch (err) {
      console.error(err);
    }
  };

  const isPhoneNumberValid = phoneNumber.length === 10;

  const handleBackClick = () => {
    setOtpScreen(false);
  };

  return (
    <>
      {otpScreen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg overflow-hidden w-[28rem] h-[500px] p-6 relative shadow-lg">
            <button
              className="absolute top-4 left-4 text-gray-600 focus:outline-none z-10 rounded-md bg-white shadow-md hover:bg-gray-100 transition-colors duration-300"
              onClick={handleBackClick}
            >
              <MdChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold mb-4 mt-16">
              Verify Your Mobile Number
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter OTP sent to +91{phoneNumber}
            </p>
            <InputOTPWithSeparator
              phone={phoneNumber}
              togglefn={togglefn}
              redirect={false}
            />
          </div>
        </div>
      )}
      {!otpScreen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg overflow-hidden w-[28rem] h-[300px]">
            <div className="p-6">
              <div className="flex justify-between">
                <h2 className="text-base font-normal mb-4">Get Started</h2>
                <RxCross1 className="cursor-pointer" onClick={togglefn} />
              </div>

              <button
                onClick={handleGoogleLogin}
                className=" h-[45px] bg-white flex text-gray-700 no-underline border border-solid border-gray-300 rounded-md items-center hover:bg-gray-300  hover:transition-all duration-500 w-full"
              >
                <div className="pl-5">
                  <Image src="/googlelogo.svg" alt="" height={19} width={19} />
                </div>
                <p className="text-base font-semibold ml-20">
                  Continue with Google
                </p>
              </button>

              <p className="ml-[185px] my-5">OR</p>

              <div className="flex mb-4 justify-center">
                <Image
                  alt="indian flag"
                  src="/indianflag.svg"
                  height={12}
                  width={20}
                  className=""
                />
                <div className="p-2 text-sm  text-gray-500 ">+91</div>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  pattern="[0-9]*"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="focus:outline-none border-b focus:border-red-400"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      return;
                    }
                    if (e.key === "Enter" && isPhoneNumberValid) {
                      return setOtpScreen((prev) => !prev);
                    }
                    const isValidInput = /^\d+$/.test(e.key);
                    if (!isValidInput) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    // Prevents pasting non-numeric characters
                    const clipboardData = e.clipboardData.getData("text/plain");

                    if (!/^\d+$/.test(clipboardData)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              {(isFocused || phoneNumber.length > 0) && (
                <button
                  onClick={Sendotp}
                  className={`bg-red-400 text-white font-semibold py-3 px-6 rounded-md w-full ${
                    !isPhoneNumberValid && "bg-slate-400"
                  }
                  }`}
                  disabled={!isPhoneNumberValid}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
