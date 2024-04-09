const Subheader = () => {
  return (
    <nav className="relative w-full h-10 hidden lg:block  bg-zinc-100 z-20">
      <div className="w-[1240px] mx-auto flex justify-between">
        <ul className="relative list-none  pt-3">
          <li className="inline">
            <a href="#Movies" className=" no-underline  text-[15px] px-2">
              Movies
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className=" no-underline  text-[15px] px-2">
              Stream
              <span className="pb-3 text-[7px] text-red-500 font-semibold absolute top-[5px] left-[110px]">
                NEW
              </span>
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className=" no-underline text-[15px] px-2">
              Events
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className=" no-underline  text-[15px] px-2">
              Plays
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className=" no-underline  text-[15px] px-2">
              Sports
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className=" no-underline  text-[15px] px-2">
              Activities
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className=" no-underline  text-[15px] px-8">
              Buzz
            </a>
          </li>
        </ul>
        <ul className="relative list-none  pt-3">
          <li className="inline">
            <a href="#Movies" className=" no-underline text-[15px] px-2">
              ListYourShow
              <span className="pb-3 text-[7px] text-red-500 font-semibold absolute top-[5px] left-[92px]">
                NEW
              </span>
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className=" no-underline text-[15px] px-2">
              Corporates
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className="no-underline text-[15px] px-2">
              Offers
            </a>
          </li>
          <li className="inline">
            <a href="#Movies" className=" no-underline text-[15px] px-2">
              Gift Cards
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Subheader;
