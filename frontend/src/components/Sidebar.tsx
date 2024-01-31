import Image from "next/image";
import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { GoGift } from "react-icons/go";
import { MdChevronRight } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiTv } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="w-full h-16 relative top-0 left-0 px-4 bg-gray-800 z-9 flex items-center">
        <h1 className="text-white">Hey!</h1>
      </nav>

      <nav className="w-full h-16 relative top-0 left-0 px-4 bg-white z-9 flex items-center shadow-md">
        <Image src="/rewards.webp" alt="" height={40} width={40} />
        <p className="text-xs pl-[15px] pt-[12px] leading-[17px] font-normal">
          Unlock special offers & great benifits
        </p>
        <button className=" h-9 w-36 rounded-[10px] text-red-500 text-sm font-semibold border border-thin border-f84464 bg-white mr-5">
          Login / Register
        </button>
      </nav>

      <a href="#" className="flex">
        <IoIosNotificationsOutline className="size-6 pt-[5px] text-black pl-1" />
        <div className="text">Notifications</div>
        <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
      </a>

      <a
        className=" flex opacity-40 cursor-not-allowed pointer-events-none"
        href="#"
      >
        <IoTicketOutline className="size-6 pt-[5px] text-black pl-1" />
        <div className="text">
          Purchase History<br></br>
          <div className="">View all your bookings & Purchases</div>
        </div>
        <IoLockClosedOutline className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
      </a>

      <a
        className="flex opacity-40 cursor-not-allowed pointer-events-none"
        href="#"
      >
        <FiTv className="size-6 pt-[5px] text-black pl-1" />
        <div className="text">
          Stream Library<br></br>
          <div className="">Rented & Purchased Movies</div>
        </div>

        <IoLockClosedOutline className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
      </a>
      <a href="#">
        <IoChatbubbleEllipsesOutline className="size-6 pt-[5px] text-black pl-1" />

        <div className="text">
          Help & Support<br></br>
          <div className="">View commonly asked queries and Chat</div>
        </div>

        <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
      </a>
      <a
        className=" opacity-40 flex cursor-not-allowed pointer-events-none"
        href="#"
      >
        <CiSettings className="size-6 pt-[5px] text-black pl-1" />

        <div className="text">
          Accounts & Settings<br></br>
          <div className="subtext">Location, Payments, Addresses & More</div>
        </div>

        <IoLockClosedOutline className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
      </a>
      <a href="#">
        <GoGift className="size-6 pt-[5px] text-black pl-1" />

        <div className="text">
          Rewards<br></br>
          <div className="">View your rewards & unlock new ones</div>
        </div>

        <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
      </a>
      <a href="#">
        <GiSelfLove className="size-6 pt-[5px] text-black pl-1" />

        <div className="text">BookASmile</div>
        <div className="size-4 absolute pt-[5px] right-[10px] text-gray-600"></div>
        <MdChevronRight className="size-4 absolute pt-[5px] right-[10px] text-gray-600" />
      </a>
    </div>
  );
};

export default Sidebar;
