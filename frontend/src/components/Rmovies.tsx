import axios from "axios";
import RmoviesItem from "./RmoviesItem";

export interface Movie {
  title: string;
  length: number;
  cast: string;
  year: number;
  genre: string;
  url: string;
  rating: number;
  _id: string;
}

const datafetch = async () => {
  const moviess = await axios.get("http://localhost:3001/api/v1/findmovie");
  return moviess.data;
};

const Rmovies = async () => {
  const movies: Movie[] = await datafetch();
  return (
    <div className="w-11/12 h-[500px] relative pl-[105px]">
      <div className="relative w-11/12 pl-[10px] h-[480px] flex mx-auto items-center overflow-x-auto  scroll-smooth overflow-hidden">
        {movies.map((movie, id) => (
          <RmoviesItem movie={movie} key={id} />
        ))}
      </div>
    </div>
  );
};

export default Rmovies;
