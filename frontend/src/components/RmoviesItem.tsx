import Link from "next/link";
import React from "react";
import { IoIosStar } from "react-icons/io";
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
        <div className=" lg:h-[35px] mt-1 lg:absolute lg:bottom-0 lg:bg-black bg-zinc-100 w-full  rounded-sm lg:rounded-md lg:p-[7px] pt-[3px]  flex items-center lg:gap-[10px]">
          <IoIosStar className="text-red-600 object-cover lg:size-5 size-3" />
          <p className=" lg:text-white lg:text-[20px] text-[12px] font-semibold">
            7.4/10 &nbsp; &nbsp;1.7k votes
          </p>
        </div>
      </div>

      <h3 className="pt-[10px] text-sm lg:text-xl font-normal mt-4 lg:m-0">
        {movie.title}
      </h3>
      <p className="text-[15px]">{movie.genre}</p>
    </Link>
  );
};

export default RmoviesItem;
