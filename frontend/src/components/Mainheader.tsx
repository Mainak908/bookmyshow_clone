"use client";
import Image from "next/image";
import { useState } from "react";
import { FaAngleDown, FaApple } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import Sidebar from "./Sidebar";

const Mainheader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <nav className="w-full h-16 relative bg-gray-800 z-50 flex  mx-auto">
      <div className="flex items-center justify-center w-full px-9">
        <div
          className={`fixed inset-y-0 z-10 right-0 w-[360px] bg-white transition-transform transform text-left ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
        <Image
          src="/logo.png"
          className=" ml-18 pr-2"
          alt=""
          height={42}
          width={115}
        />
        <div className="h-9 w-2/5 relative bg-white flex items-center rounded-md">
          <IoIosSearch className="ml-3" />
          <input
            className="flex-grow px-3 outline-none"
            placeholder="Search for Movies, Events, Plays, Sports, and Activities"
          />
        </div>
        <div className="flex ml-auto items-center gap-3">
          <div className="flex gap-2">
            <a
              href="#"
              className="relative no-underline text-white text-sm ml-4"
            >
              Kollam
            </a>
            <FaAngleDown />
          </div>
          <button className="relative w-16 h-6 mr-2 border rounded-md text-xs  text-white bg-pink-500 border-pink-500">
            Signin
          </button>

          <div
            id="id01"
            className="hidden fixed z-50 inset-0 overflow-hidden bg-black bg-opacity-40 pt-16"
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
                    <Image
                      src="/googlelogo.svg"
                      alt=""
                      height={20}
                      width={40}
                    />
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

          <RiMenu3Line
            className="cursor-pointer relative pr-4 text-white text-4xl"
            onClick={handleToggleSidebar}
          />
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleToggleSidebar}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Mainheader;
