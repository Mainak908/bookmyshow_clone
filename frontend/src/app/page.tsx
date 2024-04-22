import { CarouselSpacing } from "@/components/Carousell";
import List from "@/components/List";
import HomeMoviesEventsProfile from "@/components/Mobiledown";
import MediaRendering from "@/components/media-rendering";
import { CarouselSpacingtry } from "@/components/shadCarousel";

import Nextheader from "@/components/top/nextheader";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const App: React.FC = () => {
  return (
    <div className="pt-[64px] lg:pt-0" id="parent">
      <Nextheader />

      <CarouselSpacingtry />

      <MediaRendering minWidth={null} maxWidth="600">
        <div className=" w-full my-8 px-3">
          <img src="/bms22.avif" className=" h-[71px] w-full " alt="" />
        </div>
      </MediaRendering>

      <div className="flex justify-between lg:max-w-[1240px] lg:mt-8 lg:mb-2 m-0 lg:mx-auto w-screen px-3 lg:px-0">
        <p className="lg:text-2xl text-lg font-extrabold  ">
          Recommended Movies
        </p>
        <div className="flex gap-[1px] lg:gap-1 items-center">
          <p className="text-red-400">See All</p>
          <MdKeyboardArrowRight className="text-red-900" />
        </div>
      </div>

      <CarouselSpacing />
      <MediaRendering minWidth="1024" maxWidth={null}>
        <div className="w-[1240px]  mx-auto mt-8 ">
          <img
            src="/strip.webp"
            className="h-[105px] lg:rounded-2xl px-5 lg:p-0 my-12"
            alt=""
          />
        </div>
      </MediaRendering>
      <h1 className="lg:text-2xl text-lg font-bold lg:max-w-[1240px] mt-3 lg:mb-2 lg:mx-auto w-screen pl-2 lg:p-0 ">
        The Best of Entertainment
      </h1>

      <List />

      <HomeMoviesEventsProfile />
    </div>
  );
};

export default App;
