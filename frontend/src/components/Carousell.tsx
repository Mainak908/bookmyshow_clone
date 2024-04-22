import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import RmoviesItem from "./RmoviesItem";
import MediaRendering from "./media-rendering";
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

export async function CarouselSpacing() {
  const movies: Movie[] = await datafetch();

  return (
    <>
      <MediaRendering minWidth={null} maxWidth="600">
        <div className="overflow-x-auto flex gap-2 lg:hidden bg-white  overscroll-x-contain example">
          {movies.map((movie, index) => (
            <RmoviesItem movie={movie} key={index} />
          ))}
        </div>
      </MediaRendering>
      <MediaRendering minWidth="1024" maxWidth={null}>
        <Carousel className="w-[1240px] mx-auto scrollbar-hide hidden lg:block">
          <CarouselContent className="-ml-1">
            {movies.map((movie, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <RmoviesItem movie={movie} key={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </MediaRendering>
    </>
  );
}
