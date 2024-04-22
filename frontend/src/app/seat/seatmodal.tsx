import Image from "next/image";
import { useState } from "react";

const BookMyShowModal = ({ onClose, onSeatSelect, seatCount }) => {
  const handleSeatSelect = (seatNumber) => {
    onSeatSelect(seatNumber);
  };
  const [hoverkey, sethoverkey] = useState(seatCount);
  return (
    <div className="fixed inset-0 flex flex-col lg:items-center lg:justify-center justify-end bg-black bg-opacity-50 z-50 ">
      <div className="bg-white rounded-lg overflow-hidden lg:w-[28rem] w-full h-[381px] lg:h-[500px] p-6 relative shadow-lg flex flex-col justify-between">
        <h2 className="text-lg font-bold mb-4">How Many Seats?</h2>
        <div id="qty_bus" className="">
          <Image
            src="/bus.png"
            alt=""
            height={118}
            width={62}
            className={`mx-auto ${!(hoverkey > 7) && "hidden"}`}
          />
          <Image
            src="/bicycle.png"
            alt=""
            height={118}
            width={62}
            className={`mx-auto ${!(hoverkey == 1) && "hidden"}`}
          />
          <Image
            src="/autoRickshow.png"
            alt=""
            height={118}
            width={62}
            className={`mx-auto ${!(hoverkey > 2 && hoverkey < 5) && "hidden"}`}
          />
          <Image
            src="/car.png"
            alt=""
            height={118}
            width={62}
            className={`mx-auto ${!(hoverkey > 4 && hoverkey < 8) && "hidden"}`}
          />
          <Image
            src="/scooter.png"
            alt=""
            height={118}
            width={62}
            className={`mx-auto ${!(hoverkey == 2) && "hidden"}`}
          />
        </div>
        <div className="flex justify-between w-full">
          {[...Array(10)].map((_, index) => (
            <button
              key={index + 1}
              className={`${
                seatCount == index + 1 && "bg-[#f84464] text-white"
              } hover:text-white  rounded-full hover:bg-[#f84464] h-[30px] w-[30px] text-center transition duration-700`}
              onClick={() => handleSeatSelect(index + 1)}
              onMouseEnter={() => sethoverkey(index + 1)}
              onMouseLeave={() => sethoverkey(seatCount)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className=" mt-4">
          <button
            className="bg-[#f84464] text-white px-4 py-2 rounded-md w-full"
            onClick={onClose}
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookMyShowModal;
