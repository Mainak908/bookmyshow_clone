import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[320px] mx-auto h-[50px] relative"
    >
      <CarouselContent className="-ml-[2px]">
        {Array.from({ length: 9 }).map((_, index) => (
          <CarouselItem key={index} className="lg:basis-1/6 pl-[2px]">
            <Card className="h-[50px] w-[50px]">
              <CardContent className="flex aspect-square items-center justify-center ">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext className="absolute -right-[25px] rounded-none h-[50px] w-[50px] border-none hover:bg-white" />
    </Carousel>
  );
}
