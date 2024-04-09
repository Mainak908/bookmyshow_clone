const MobileSubnavbar = () => {
  return (
    <div className="overflow-x-auto flex lg:hidden bg-white  overscroll-x-contain example mt-[64px]">
      <div className="rounded-lg p-4 text-center">
        <h2 className="text-sm font-semibold">Home</h2>
      </div>
      <div className="rounded-lg p-4 text-center">
        <h2 className="text-sm font-semibold">Movies</h2>
      </div>
      <div className="rounded-lg p-4 text-center">
        <h2 className="text-sm font-semibold">Events</h2>
      </div>
      <div className="rounded-lg p-4 text-center">
        <h2 className="text-sm font-semibold">Profile</h2>
      </div>
      <div className="rounded-lg p-4 text-center">
        <h2 className="text-sm font-semibold">Profile</h2>
      </div>
      <div className="rounded-lg p-4 text-center">
        <h2 className="text-sm font-semibold">Profile</h2>
      </div>
      <div className="rounded-lg p-4 text-center">
        <h2 className="text-sm font-semibold">Profile</h2>
      </div>
      {/* Dummy divs for spacing */}
      <div style={{ width: "calc(100% + 20px)" }}></div>
    </div>
  );
};

export default MobileSubnavbar;
