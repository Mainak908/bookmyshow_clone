"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function CarouselSpacingtry() {
  return (
    <div className="py-3 lg:bg-zinc-200">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
      >
        <CarouselContent className="-ml-1 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 lg:basis-[65%] ">
              <img
                src="bms16.avif"
                alt="Banner 1"
                className=" lg:rounded-2xl h-[195px] lg:h-[297px] lg:w-[1240px] w-screen"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
