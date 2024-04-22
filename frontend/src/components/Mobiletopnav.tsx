import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

const MobiletopNav = () => {
  return (
    <div className=" flex fixed justify-between bg-cover items-center top-0 left-0 w-screen h-[64px] bg-[url('/backg.avif')] bg-white  border-b-[1px] border-solid border-b-slate-400 z-10">
      <div className="ml-2">
        <h2 className="text-2xl font-bold">It All Starts Here!</h2>
        <div className="flex gap-1 items-center">
          <p className="text-red-400">Kolkata</p>
          <MdKeyboardArrowRight className="text-red-400" />
        </div>
      </div>
      <div className="flex items-center gap-3 mr-2">
        <button className=" p-1 rounded-md bg-white border border-zinc-300">
          Use App
        </button>
        <IoIosSearch className="text-2xl" />
      </div>
    </div>
  );
};

export default MobiletopNav;
