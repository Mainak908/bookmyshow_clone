import React from "react";

const Subheader = () => {
  return (
    <nav className="relative w-full h-10 flex justify-between bg-gray-900">
      <ul className="relative list-none m-0 p-0 left-[138px] pt-3">
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Movies
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Stream
            <span className="pb-3 text-[7px] text-red-500 font-semibold absolute top-[5px] left-[110px]">
              NEW
            </span>
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Events
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Plays
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Sports
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Activities
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-8"
          >
            Buzz
          </a>
        </li>
      </ul>
      <ul className="relative list-none m-0 p-0 right-[136px] pt-[10px]">
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            ListYourShow
            <span className="pb-3 text-[7px] text-red-500 font-semibold absolute top-[5px] left-[75px]">
              NEW
            </span>
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Corporates
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Offers
          </a>
        </li>
        <li className="inline">
          <a
            href="#Movies"
            className="inline no-underline text-white text-[15px] px-2"
          >
            Gift Cards
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Subheader;
