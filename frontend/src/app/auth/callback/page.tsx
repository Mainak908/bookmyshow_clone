"use client";

import { AuthContext } from "@/providers";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";

const Callback = () => {
  const called = useRef(false);
  const { checkLoginState, loggedIn } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (loggedIn === false) {
        try {
          if (called.current) return; // prevent rerender caused by StrictMode
          called.current = true;

          // get the URL parameters which will include the auth token
          const params = window.location.search;

          if (window.opener) {
            // send them to the opening window
            window.opener.postMessage(params);
            // close the popup
            window.close();
          }
        } catch (err) {
          console.error(err);
        }
      } else if (loggedIn === true) {
        router.push("/");
      }
    })();
  }, [checkLoginState, loggedIn, router]);

  return <p>Please wait...</p>;
};

export default Callback;
