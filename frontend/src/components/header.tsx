import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
interface Prop {
  details: string;
  seatCount: number;
  setShowModal: any;
}
export interface MovieHall {
  name: string;
  location: string;
  seatMatrices: { seatNumber: string; fare: number }[][][];
}
const HeaderCmp = ({ details, seatCount, setShowModal }: Prop) => {
  //TODO:
  const [moviedata, setmoviedata] = useState<MovieHall | null>();
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/findhallbyid`, {
        hallId: details,
      })
      .then((data) => data.data)
      .then((data) => setmoviedata(data));
  }, []);

  return (
    <div className="flex py-4 px-5 w-full fixed">
      <FaAngleLeft className="size-7" />
      <div className=" flex items-center justify-between w-full">
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
        <div className="flex justify-between ">
          <div
            className="border border-black flex gap-2 px-2 py-1 justify-center rounded cursor-pointer mr-4"
            onClick={() => setShowModal(true)}
          >
            <p className="text-xs">{seatCount} tickets</p>
            <GoPencil className="size-3" />
          </div>
          <RxCross2 />
        </div>
      </div>
    </div>
  );
};

export default HeaderCmp;
