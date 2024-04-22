const MobileSubnavbar = () => {
  return (
    <div className="overflow-x-auto flex bg-white  overscroll-x-contain example ">
      <img src="/bms1.avif" alt="" className="h-[71px] w-[71px]" />
      <img src="/bms2.avif" alt="" className="h-[71px] w-[71px]" />
      <img src="/bms3.avif" alt="" className="h-[71px] w-[71px]" />
      <img src="/bms4.avif" alt="" className="h-[71px] w-[71px]" />
      <img src="/bms5.avif" alt="" className="h-[71px] w-[71px]" />
      <img src="/bms6.avif" alt="" className="h-[71px] w-[71px]" />
      <img src="/bms7.avif" alt="" className="h-[71px] w-[71px]" />

      {/* Dummy divs for spacing */}
      <div style={{ width: "calc(100% + 20px)" }}></div>
    </div>
  );
};

export default MobileSubnavbar;
