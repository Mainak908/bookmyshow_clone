import React from "react";
import Mainheader from "@/components/Mainheader";
import Subheader from "@/components/subheader";
import Rmovies from "@/components/Rmovies";
import Carousel from "@/components/Carousel";
import List from "@/components/List";

const App: React.FC = () => {
  return (
    <div className="  ">
      <Mainheader />
      <Subheader />
      <Carousel />
      <h1 className="title">Recommended Movies</h1>
      <Rmovies />
      <div className="pl-[145px] pt-[50px] h-[10px]">
        <img src="/strip.webp" className="h-[105px]" alt="" />
      </div>
      <h1 className="title-enter">The Best of Entertainment</h1>
      <List />
    </div>
  );
};

export default App;
