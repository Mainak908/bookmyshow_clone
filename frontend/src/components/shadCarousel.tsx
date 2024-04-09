"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export function CarouselSpacingtry() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="py-3 lg:bg-zinc-200">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="-ml-1 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 lg:basis-[65%] ">
              <img
                src="https://res.cloudinary.com/dddm02rvi/image/upload/v1711804651/mkurpkqhlid7ua5uboct.webp"
                alt="Banner 1"
                className=" lg:rounded-2xl h-[195px] lg:h-[297px] lg:w-[1240px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
