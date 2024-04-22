"use client";
import { AuthContext } from "@/providers";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CiSettings } from "react-icons/ci";
import { FiTv } from "react-icons/fi";
import { GiSelfLove } from "react-icons/gi";
import { GoGift } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  IoChatbubbleEllipsesOutline,
  IoLockClosedOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { MdChevronRight, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { loggedIn, user } = useContext(AuthContext);

  const LogoutFn = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/logout`,
      {
        withCredentials: true,
      }
    );
    if (data.success) {
      toast("logout done");

      window.location.reload();
    }
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2">
        <nav className="w-full h-16 relative px-4  z-9 flex border-b border-gray-300 justify-between">
          <div className="my-auto">
            <h1 className="font-bold text-xl">
              Hey {user && user.name !== undefined ? user.name : "User"}
            </h1>
            {loggedIn && (
              <Link href={"/profileedit"}>
                <div className="flex gap-1">
                  <p className="text-sm">My Profile</p>
                  <MdKeyboardArrowRight />
                </div>
              </Link>
            )}
          </div>
          {loggedIn && (
            <Image
              src={user?.picture}
              height={40}
              width={40}
              alt=""
              className="rounded-full h-[40px] my-auto"
            />
          )}
        </nav>
        {!loggedIn && (
          <nav className="w-full h-16 relative top-0 left-0 px-4 bg-white z-9 flex items-center shadow-md">
            <Image src="/rewards.webp" alt="" height={40} width={40} />
            <p className="text-xs pl-[15px] pt-[12px] leading-[17px] font-normal">
              Unlock special offers & great benifits
            </p>
            <Link
              href={"/login"}
              className=" h-9 w-36 rounded-[10px] text-red-500 text-sm font-semibold border border-thin border-f84464 bg-white mr-5 flex justify-center items-center"
            >
              Login / Register
            </Link>
          </nav>
        )}

        <a href="#" className="flex">
          <div className="flex justify-center">
            <IoIosNotificationsOutline className="size-6 pt-[5px] text-black pl-1 mx-3" />
            <div className="text-sm">Notifications</div>
          </div>

          <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
        </a>

        <a
          className={`flex ${
            !loggedIn && "opacity-40 cursor-not-allowed pointer-events-none"
          }`}
          href="#"
        >
          <div className="flex justify-center">
            <IoTicketOutline className="size-6 pt-[5px] text-black pl-1 mx-3" />
            <div className="text-sm">
              Purchase History<br></br>
              <div className="text-xs">View all your bookings & Purchases</div>
            </div>
          </div>
          {loggedIn ? (
            <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
          ) : (
            <IoLockClosedOutline className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
          )}{" "}
        </a>

        <a
          className={`flex ${
            !loggedIn && "opacity-40 cursor-not-allowed pointer-events-none"
          }`}
          href="#"
        >
          <FiTv className="size-6 pt-[5px] text-black pl-1 mx-3" />
          <div className="text-sm">
            Stream Library<br></br>
            <div className="text-xs">Rented & Purchased Movies</div>
          </div>
          {loggedIn ? (
            <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
          ) : (
            <IoLockClosedOutline className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
          )}{" "}
        </a>
        <a href="#" className="flex">
          <IoChatbubbleEllipsesOutline className="size-6 pt-[5px] text-black pl-1 mx-3" />

          <div className="text-sm">
            Help & Support<br></br>
            <div className="text-xs">View commonly asked queries and Chat</div>
          </div>

          <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
        </a>
        <a
          className={`flex ${
            !loggedIn && "opacity-40 cursor-not-allowed pointer-events-none"
          }`}
          href="#"
        >
          <CiSettings className="size-6 pt-[5px] text-black pl-1 mx-3" />

          <div className="text-sm">
            Accounts & Settings<br></br>
            <div className="text-xs">Location, Payments, Addresses & More</div>
          </div>
          {loggedIn ? (
            <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
          ) : (
            <IoLockClosedOutline className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
          )}
        </a>
        <a href="#" className="flex">
          <GoGift className="size-6 pt-[5px] text-black pl-1 mx-3" />

          <div className="text-sm">
            Rewards<br></br>
            <div className="text-xs">View your rewards & unlock new ones</div>
          </div>

          <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
        </a>
        <a href="#" className="flex">
          <GiSelfLove className="size-6 pt-[5px] text-black pl-1 mx-3" />

          <p className="text-sm">BookASmile</p>

          <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
        </a>
      </div>
      {loggedIn && (
        <div className="shadow-2xl h-16 w-full p-3">
          <button
            className="border border-red-400 h-full w-full text-red-400 font-semibold"
            onClick={LogoutFn}
          >
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
