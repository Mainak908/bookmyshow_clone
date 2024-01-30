import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
interface Prop {
  details: string;
}
export interface MovieHall {
  name: string;
  location: string;
  seatMatrices: { seatNumber: string; fare: number }[][][];
}
const HeaderCmp = ({ details }: Prop) => {
  const [moviedata, setmoviedata] = useState<MovieHall | null>();
  useEffect(() => {
    axios
      .post("http://localhost:3001/api/v1/findhallbyid", {
        hallId: details,
      })
      .then((data) => data.data)
      .then((data) => setmoviedata(data));
  }, []);

  return (
    <div className="flex py-4 px-3">
      <FaAngleLeft className=" ml-4 size-7" />
      <div className="container mx-auto flex items-center justify-between">
        {moviedata && (
          <div className="flex flex-col justify-between">
            <div className="flex">
              <h3>{moviedata.name}</h3>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <text
                  x="50%"
                  y="50%"
                  fontSize="12"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="currentColor"
                >
                  U/A
                </text>
              </svg>
            </div>
            <p>{moviedata?.location}</p>
          </div>
        )}
        <div className="flex justify-between">
          <div className=" border-black flex gap-2 p-3">
            <p>4 tieckts</p>
            <GoPencil />
          </div>
          <RxCross2 />
        </div>
      </div>
    </div>
  );
};

export default HeaderCmp;
