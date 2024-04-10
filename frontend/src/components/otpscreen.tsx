"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useRef, useState } from "react";

export function InputOTPWithSeparator() {
  const [value, setValue] = useState("");

  if (value.length === 6) console.log("otp submitted");
  const inputref = useRef(null);
  useEffect(() => {
    // console.log(inputref.current);
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
        <InputOTPGroup className="gap-2 focus:outline-none ">
          <InputOTPSlot index={0} className="focus:outline-none  " />
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
