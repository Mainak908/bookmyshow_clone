import FlipkartBanner from "@/components/Carousel";
import { CarouselSpacing } from "@/components/Carousell";
import List from "@/components/List";
import Mainheader from "@/components/Mainheader";
import Subheader from "@/components/subheader";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="  ">
      <Mainheader />
      <Subheader />
      <FlipkartBanner />
      <h1 className="text-2xl text-black font-bold ml-[330px]">
        Recommended Movies
      </h1>
      <CarouselSpacing />

      <div className="w-[1240px] mx-auto mt-8 ">
        <img src="/strip.webp" className="h-[105px] rounded-2xl" alt="" />
      </div>
      <h1 className="text-2xl text-black font-bold ml-[330px]">
        The Best of Entertainment
      </h1>
      <List />
    </div>
  );
};

export default App;
