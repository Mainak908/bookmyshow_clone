import React from "react";

import RmoviesItem from "./RmoviesItem";

const Rmovies = () => {
  return (
    <div className="w-11/12 h-[500px] relative pl-[105px]">
      <div className="relative w-11/12 pl-[10px] h-[480px] flex mx-auto items-center overflow-x-auto  scroll-smooth overflow-hidden">
        <RmoviesItem />
        <RmoviesItem />
        <RmoviesItem />
        <RmoviesItem />
        <RmoviesItem />
        <RmoviesItem />
        <RmoviesItem />
      </div>
    </div>
  );
};

export default Rmovies;
