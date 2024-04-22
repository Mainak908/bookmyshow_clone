"use client";
import { useEffect, useState } from "react";
import MediaRendering from "./media-rendering";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const List = () => {
  const [canScrollPrev, setCanScrollPrev] = useState<boolean | undefined>(
    false
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.scrollNext();
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    setCanScrollPrev(api.canScrollPrev());
  }, [api]);

  return (
    <>
      <MediaRendering minWidth={null} maxWidth="600">
        <div className="overflow-x-auto flex gap-2    overscroll-x-contain  pl-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <img
              src="/enter/enter1.webp"
              className=" rounded-md w-[124px] h-[102px] "
              alt=""
              key={index}
            />
          ))}
        </div>
      </MediaRendering>
      <MediaRendering minWidth="1024" maxWidth={null}>
        <div className="hidden lg:flex lg:flex-col lg:w-[1290px] mx-auto">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent className="ml-5">
              {Array.from({ length: 9 }).map((_, index) => (
                <CarouselItem key={index} className="pl-1 lg:basis-1/5">
                  <img
                    src="/enter/enter1.webp"
                    className=" rounded-2xl w-[222px] h-full "
                    alt=""
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </div>
      </MediaRendering>
    </>
  );
};

export default List;
