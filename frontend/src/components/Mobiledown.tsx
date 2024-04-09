const HomeMoviesEventsProfile = () => {
  return (
    <div className=" fixed bottom-0 left-0 w-screen bg-white border border-solid border-t-slate-200 lg:hidden ">
      <div className="flex justify-evenly ">
        <div className=" rounded-lg p-4 text-center">
          <h2 className="text-sm font-semibold">Home</h2>
        </div>
        <div className=" rounded-lg p-4 text-center">
          <h2 className="text-sm font-semibold">Movies</h2>
        </div>
        <div className=" rounded-lg p-4 text-center">
          <h2 className="text-sm font-semibold">Events</h2>
        </div>
        <div className=" rounded-lg p-4 text-center">
          <h2 className="text-sm font-semibold">Profile</h2>
        </div>
      </div>
    </div>
  );
};

export default HomeMoviesEventsProfile;
