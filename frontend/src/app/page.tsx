import List from "@/components/List";
import Mainheader from "@/components/Mainheaderlg";
import MobileSubnavbar from "@/components/MobileSubNavbar";
import HomeMoviesEventsProfile from "@/components/Mobiledown";
import MobiletopNav from "@/components/Mobiletopnav";
import { CarouselSpacingtry } from "@/components/shadCarousel";
import Subheader from "@/components/subheaderlg";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const App: React.FC = () => {
  return (
    <div className="" id="parent">
      <Mainheader />
      <MobiletopNav />
      <Subheader />
      <MobileSubnavbar />
      <CarouselSpacingtry />
      <div className="flex justify-between lg:max-w-[1240px] m-0 lg:mx-auto w-screen">
        <p className="lg:text-2xl text-lg font-bold  ">Recommended Movies</p>
        <div className="flex gap-[1px] lg:gap-1 items-center">
          <p className="text-red-400">See All</p>
          <MdKeyboardArrowRight className="text-red-900" />
        </div>
      </div>

      {/* <CarouselSpacing /> */}

      <div className="lg:w-[1240px] w-full mx-auto mt-8 ">
        <img
          src="/strip.webp"
          className="lg:h-[105px] h-[71px] lg:rounded-2xl px-5 lg:p-0"
          alt=""
        />
      </div>
      <h1 className="lg:text-2xl text-lg font-bold lg:max-w-[1240px] m-0 lg:mx-auto w-screen">
        The Best of Entertainment
      </h1>

      <List />

      <HomeMoviesEventsProfile />
    </div>
  );
};

export default App;
