import React from "react";
import { IoIosHeart } from "react-icons/io";

const RmoviesItem = () => {
  return (
    <div className="relative w-full">
      <div className="relative min-w-[225px] w-[225px] h-[400px] rounded-[10px] overflow-hidden mr-[30px]">
        <img src="/poster1.jpg" className="w-full h-full object-cover" alt="" />
        <div className="w-full h-[35px] absolute bottom-0 bg-black p-[7px] flex items-center">
          <IoIosHeart className="text-red-600 object-cover" />
          <p className="absolute text-white text-[16px] pl-[30px] top-[7px] ">
            93% &nbsp;928 votes
          </p>
        </div>
      </div>
      <h3 className="pt-[10px] text-[10px]">Theerppu</h3>
      <p className="text-[15px]">Drama/Thriller</p>
    </div>
  );
};

export default RmoviesItem;
