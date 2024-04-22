import Link from "next/link";
import React from "react";
import { IoIosHeart } from "react-icons/io";
import { Movie } from "./Carousell";

interface movieprop {
  movie: Movie;
}
//186,241  border-4 border-solid border-yellow-600
const RmoviesItem: React.FC<movieprop> = ({ movie }) => {
  return (
    <Link className="relative" href={`/movie?search=${movie._id}`}>
      <div className="relative w-[124px] h-[186px] lg:h-[378px] lg:w-[222px]">
        <img
          src="poster1.jpg"
          className="h-full lg:rounded-[10px] rounded-md"
          alt=""
        />
        <div className=" lg:h-[35px] mt-1 lg:absolute lg:bottom-0 lg:bg-black bg-zinc-100 w-full  rounded-sm lg:rounded-md lg:p-[7px] pt-[3px]  flex items-center justify-center">
          <IoIosHeart className="text-red-600 object-cover " />
          <p className=" lg:text-white lg:text-[16px] text-[12px] ">
            93% &nbsp;928 votes
          </p>
        </div>
      </div>

      <h3 className="pt-[10px] text-xl font-normal mt-4 lg:m-0">
        {movie.title}
      </h3>
      <p className="text-[15px]">{movie.genre}</p>
    </Link>
  );
};

export default RmoviesItem;
