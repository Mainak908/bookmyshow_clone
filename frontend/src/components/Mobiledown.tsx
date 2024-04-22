const HomeMoviesEventsProfile = () => {
  return (
    <div className=" fixed bottom-0 left-0 w-screen bg-white border border-solid border-t-slate-200 lg:hidden ">
      <div className="flex justify-between px-4 py-3">
        <div className=" rounded-lg flex flex-col justify-center items-center">
          <img src="/bms8.avif" alt="" className="h-[20px] w-[20px]" />
          <p className="text-sm">Home</p>
        </div>
        <div className=" rounded-lg flex flex-col justify-center items-center">
          <img src="/bms9.png" alt="" className="h-[20px] w-[20px]" />
          <p className="text-sm">Movies</p>
        </div>
        <div className=" rounded-lg flex flex-col justify-center items-center">
          <img src="/bms10.png" alt="" className="h-[20px] w-[20px]" />
          <p className="text-sm">Events</p>
        </div>
        <div className=" rounded-lg flex flex-col justify-center items-center">
          <img src="/bms11.png" alt="" className="h-[20px] w-[20px]" />
          <p className="text-sm">Profile</p>
        </div>
      </div>
    </div>
  );
};

export default HomeMoviesEventsProfile;
