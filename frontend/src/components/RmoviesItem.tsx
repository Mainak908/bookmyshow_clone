import Link from "next/link";
import React from "react";
import { IoIosHeart } from "react-icons/io";
import { Movie } from "./Rmovies";
interface movieprop {
  movie: Movie;
}
const RmoviesItem: React.FC<movieprop> = ({ movie }) => {
  return (
    <Link className="relative w-full" href={`/movie?search=${movie._id}`}>
      <div className="relative min-w-[225px] w-[225px] h-[400px] rounded-[10px] overflow-hidden mr-[30px]">
        <img src="poster1.jpg" className="w-full h-full object-cover" alt="" />
        <div className="w-full h-[35px] absolute bottom-0 bg-black p-[7px] flex items-center">
          <IoIosHeart className="text-red-600 object-cover" />
          <p className="absolute text-white text-[16px] pl-[30px] top-[7px] ">
            93% &nbsp;928 votes
          </p>
        </div>
      </div>
      <h3 className="pt-[10px] text-[10px]">{movie.title}</h3>
      <p className="text-[15px]">{movie.genre}</p>
    </Link>
  );
};

export default RmoviesItem;
