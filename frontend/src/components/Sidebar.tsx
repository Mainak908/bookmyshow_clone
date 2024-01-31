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
    <div>
      <nav className="w-full h-16 relative top-0 left-0 px-4 bg-gray-800 z-9 flex items-center">
        <h1>Hey!</h1>
      </nav>

      <nav className="w-full h-16 relative top-0 left-0 px-4 bg-white z-9 flex items-center shadow-md">
        <Image src="img/rewards.webp" alt="" height={40} width={40} />
        <p className="text-xs pl-15 pt-12 leading-17 font-normal">
          Unlock special offers & great benifits
        </p>
        <button className="login h-9 w-36 rounded-10 text-white text-sm font-semibold border border-thin border-f84464 bg-white">
          Login / Register
        </button>
      </nav>

      <a href="#">
        <div className="size-5 pt-8 absolute text-black pl-4">
          <IoIosNotificationsOutline />
        </div>
        <div className="text">Notifications</div>
        <div className="size-4 absolute pt-[5px] right-[10px] text-gray-600">
          <MdChevronRight />
        </div>
      </a>
      <a className="opacity-40 cursor-not-allowed pointer-events-none" href="#">
        <div className="size-5 pt-8 absolute text-black pl-4">
          <IoTicketOutline />
        </div>
        <div className="text">
          Purchase History<br></br>
          <div className="subtext">View all your bookings & Purchases</div>
        </div>
        <div className="size-4 absolute pt-[5px] right-[10px] text-gray-600">
          <IoLockClosedOutline />
        </div>
      </a>
      <a className="opacity-40 cursor-not-allowed pointer-events-none" href="#">
        <div className="size-5 pt-8 absolute text-black pl-4">
          <FiTv />
        </div>
        <div className="text">
          Stream Library<br></br>
          <div className="subtext">Rented & Purchased Movies</div>
        </div>
        <div className="size-4 absolute pt-[5px] right-[10px] text-gray-600">
          <IoLockClosedOutline />
        </div>
      </a>
      <a href="#">
        <div className="size-5 pt-8 absolute text-black pl-4">
          <IoChatbubbleEllipsesOutline />
        </div>
        <div className="text">
          Help & Support
          <div className="subtext">View commonly asked queries and Chat</div>
        </div>
        <div className="size-4 absolute pt-[5px] right-[10px] text-gray-600">
          <MdChevronRight />
        </div>
      </a>
      <a
        className="btn-opacity-40 cursor-not-allowed pointer-events-none"
        href="#"
      >
        <div className="size-5 pt-8 absolute text-black pl-4">
          <CiSettings />
        </div>
        <div className="text">
          Accounts & Settings<br></br>
          <div className="subtext">Location, Payments, Addresses & More</div>
        </div>
        <div className="size-4 absolute pt-[5px] right-[10px] text-gray-600">
          <IoLockClosedOutline />
        </div>
      </a>
      <a href="#">
        <div className="size-5 pt-8 absolute text-black pl-4">
          <GoGift />
        </div>
        <div className="text">
          Rewards<br></br>
          <div className="subtext">View your rewards & unlock new ones</div>
        </div>
        <div className="size-4 absolute pt-[5px] right-[10px] text-gray-600">
          <MdChevronRight />
        </div>
      </a>
      <a href="#">
        <div className="size-5 pt-8 absolute text-black pl-4">
          <GiSelfLove />
        </div>
        <div className="text">BookASmile</div>
        <div className="size-4 absolute pt-[5px] right-[10px] text-gray-600"></div>
      </a>
    </div>
  );
};

export default Sidebar;
