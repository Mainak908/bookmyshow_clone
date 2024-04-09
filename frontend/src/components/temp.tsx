import Image from "next/image";
import { FaApple } from "react-icons/fa6";

const temp = () => {
  return (
    <div
      id="id01"
      className=" fixed z-50 inset-0 overflow-hidden bg-black bg-opacity-40 pt-16"
    >
      <div className="bg-white mx-auto my-2 top-5 bottom-15 rounded-md h-82% w-428">
        <div className="">
          <h3>Get Started</h3>
          <span
            className="absolute top-15 right-30 text-gray-700 text-28"
            title="Close Modal"
          >
            {/* <ion-icon name="close-outline"></ion-icon> */}
          </span>
        </div>

        <div className="p-4">
          <a
            href="#"
            className="mt-25 ml-30 mr-30 h-45 bg-white flex text-gray-700 no-underline border border-solid border-gray-300 rounded-md items-center hover:bg-gray-300   hover:transition-all duration-500"
          >
            <div className="pl-5">
              <Image src="/googlelogo.svg" alt="" height={20} width={40} />
            </div>
            <div className="text">Continue with Google</div>
          </a>
          <a href="#" className="">
            <div className="pl-6">
              {/* <ion-icon name="mail-outline" style="font-size: 22px;"></ion-icon> */}
            </div>
            <div className="text-gray-700 text-sm font-semibold">
              Continue with Email
            </div>
          </a>
          <a href="#" className="">
            <div className="pl-5">
              <FaApple className="size-5" />
            </div>
            <div className="text-gray-700 text-sm font-semibold">
              Continue with Apple
            </div>
          </a>
        </div>
        <h2>OR</h2>

        <div className="flex pt-6">
          <Image
            alt="indian flag"
            src="/indianflag.svg"
            height={20}
            width={40}
            className="pl-12"
          />
          <div className="pl-5 text-sm pt-3 text-gray-500 pr-10">+91</div>
          <input
            id="mobileNo"
            type="tel"
            pattern="[0-9]*"
            placeholder="Continue with mobile number"
            className="w-275  border-b border-solid border-gray-300 bg-transparent outline-none h-28 text-black text-sm transition duration-500 focus:cursor-text"
          />
        </div>

        <p>
          I agree to the <u>Terms & Conditions</u>&<u>Privacy Policy</u>
        </p>
      </div>
    </div>
  );
};

export default temp;
