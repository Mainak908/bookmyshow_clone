"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCallback, useEffect, useRef, useState } from "react";

export function InputOTPWithSeparator({ phone }) {
  const [value, setValue] = useState("");

  const handleVerifyOTP = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, value }),
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
  }, [value]);

  useEffect(() => {
    if (value.length === 6) {
      handleVerifyOTP();
    }
  }, [value]);

  const inputref = useRef(null);
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
