import React from "react";
import RecommendedMovies from "@/components/Movies";
import Mainheader from "@/components/Mainheader";
import Subheader from "@/components/subheader";
import Rmovies from "@/components/Rmovies";

const App: React.FC = () => {
  return (
    <div className=" block ">
      <Mainheader />
      <Subheader />

      <Rmovies />
    </div>
  );
};

export default App;
