"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthContext } from "@/providers";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
interface Iprops {
  phone: string;
  togglefn?: any;
  redirect?: boolean;
}
export function InputOTPWithSeparator({ phone, togglefn, redirect }: Iprops) {
  const [value, setValue] = useState("");
  const { checkLoginState } = useContext(AuthContext);
  const inputref = useRef(null);
  const router = useRouter();
  const handleVerifyOTP = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/verifyOTP`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, value }),
          credentials: "include",
        }
      );
      const res = await response.json();
      if (res.success) {
        !redirect && togglefn();
        checkLoginState();
        redirect && router.push("/");
      } else {
        toast("wrong otp entered");
      }
    } catch (error) {
      console.log(error);
    }
  }, [value]);

  useEffect(() => {
    if (value.length === 6) {
      handleVerifyOTP();
    }
  }, [value]);

  useEffect(() => {
    if (inputref.current) inputref.current.focus();
  }, []);
  return (
    <div>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
        className="focus:outline-none"
        ref={inputref}
      >
        <InputOTPGroup className="gap-2 focus:outline-none">
          <InputOTPSlot index={0} className="focus:outline-none" />
          <InputOTPSlot index={1} className="focus:outline-none" />

          <InputOTPSlot index={2} className="focus:outline-none" />
          <InputOTPSlot index={3} className="focus:outline-none" />

          <InputOTPSlot index={4} className="focus:outline-none" />
          <InputOTPSlot index={5} className="focus:outline-none" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
