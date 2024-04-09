"use client";
import LoadingPage from "@/app/loading";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import getGoogleOAuthURL from "../../utils/getGoogleUri";

const SignInModal = ({ togglefn }: any) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (e: any) => {
    const { value } = e.target;

    setPhoneNumber(value.slice(0, 10));
  };

  const handleGoogleLogin = () => {
    // setLoading(true);
    const googleOAuthURL = getGoogleOAuthURL();

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

    // Open a new window with Google OAuth URL
    const newWindow = window.open(googleOAuthURL, "_blank", windowFeatures);

    function handleMessage(event) {
      console.log(event.data);
      if (event.origin !== window.location.origin) {
        return; // Ignore messages not from the same origin
      }

      if (event.data === "popupClosed") {
        setLoading(false);
        window.removeEventListener("message", handleMessage); // Clean up event listener
      }
    }

    // Add event listener for handling messages
    window.addEventListener("message", handleMessage);

    // Add event listener for beforeunload to send message to parent window before closing
    newWindow.addEventListener("beforeunload", function (event) {
      // Send a message to the parent window before closing
      newWindow.opener.postMessage(
        "popupClosed",
        newWindow.opener.location.origin
      );
    });

    // Focus on the new window if it's opened
    if (newWindow) {
      newWindow.focus();
    } else {
      // Handle popup blocker or other issues
      console.error("Popup window blocked or failed to open.");
      // Redirect the user to the OAuth URL in the current window as a fallback
      window.location.href = googleOAuthURL;
    }
  };

  const isPhoneNumberValid = phoneNumber.length === 10;

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        phone: phoneNumber,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }, [phoneNumber]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden w-[28rem]">
        {loading ? (
          <LoadingPage className="h-96" />
        ) : (
          <div className="p-6">
            <div className="flex justify-between">
              <h2 className="text-base font-normal mb-4">Get Started</h2>
              <RxCross1 className="cursor-pointer" onClick={togglefn} />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md w-full mb-4"
            >
              Continue with Google
            </button>
            <p className="mx-auto">OR</p>
            <div className="flex pt-6 mb-4 justify-center">
              <Image
                alt="indian flag"
                src="/indianflag.svg"
                height={20}
                width={40}
                className="pl-[12px]"
              />
              <div className="pl-[5px] text-sm pt-3 text-gray-500 pr-10">
                +91
              </div>
              <input
                type="tel"
                placeholder="Enter your phone number"
                pattern="[0-9]*"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="focus:outline-none border-b focus:border-red-400"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            {(isFocused || phoneNumber.length > 0) && (
              <button
                onClick={login}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md w-full ${
                  isFocused && isPhoneNumberValid ? "" : "opacity-50"
                }`}
                disabled={!isFocused || !isPhoneNumberValid}
              >
                Continue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
