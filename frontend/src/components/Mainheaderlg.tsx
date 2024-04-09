"use client";
import Image from "next/image";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import Sidebar from "./Sidebar";
import SignInModal from "./signin";

const Mainheader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSigninOpen, setisSigninOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleToggleSigninbar = () => {
    setisSigninOpen(!isSigninOpen);
  };

  return (
    <nav className="w-full h-16 relative z-50 hidden lg:flex  mx-auto ">
      <div className="flex items-center justify-center lg:w-[1245px] mx-auto ">
        <div
          className={`fixed inset-y-0 z-10 right-0 w-[360px] bg-white transition-transform transform text-left ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
        <Image
          src="/logo.svg"
          className="mr-4 overflow-hidden z-[-1]"
          alt=""
          height={42}
          width={115}
        />
        <div className="h-9 w-[550px] relative  flex items-center rounded-md border border-solid ">
          <IoIosSearch className="ml-3" />
          <input
            className="flex-grow px-3 outline-none"
            placeholder="Search for Movies, Events, Plays, Sports, and Activities"
          />
        </div>
        <div className="flex ml-auto items-center gap-3">
          <div className="flex gap-2">
            <a href="#" className="relative no-underline text-sm ml-4">
              Kollam
            </a>
            <FaAngleDown />
          </div>
          <button
            className="relative w-16 h-6 mr-2 border rounded-md text-xs  text-white bg-pink-500 border-pink-500"
            onClick={handleToggleSigninbar}
          >
            Signin
          </button>
          {isSigninOpen && <SignInModal togglefn={handleToggleSigninbar} />}

          <RiMenu3Line
            className="cursor-pointer relative pr-4  text-4xl"
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
