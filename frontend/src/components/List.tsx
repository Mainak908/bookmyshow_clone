import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const List = () => {
  return (
    <Carousel className="w-[1240px] mx-auto">
      <CarouselContent className="-ml-1">
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter1.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter2.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter5.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter6.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter7.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter8.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter9.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter10.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter11.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter12.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter3.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
          <div className="card">
            <img
              src="/enter/enter4.webp"
              className="card-img rounded-2xl"
              alt=""
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default List;
