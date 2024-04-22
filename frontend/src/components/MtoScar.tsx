"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CarouselSize() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const movie = searchParams.get("movie");
  const movieId = searchParams.get("search");
  const getdate = date.split("/")[1];

  const currentDateTime = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-11/12 lg:w-[320px] ml-7 h-[50px] relative mt-3"
    >
      <CarouselContent className="-ml-[2px]">
        {Array.from({ length: 13 }).map((_, index) => {
          const nextDay = new Date(currentDateTime);
          nextDay.setDate(currentDateTime.getDate() + index);
          const dayOfWeek = nextDay.getDay();
          const dayOfMonth = nextDay.getDate();
          const month = nextDay.getMonth();
          const dayName = daysOfWeek[dayOfWeek];
          const monthName = monthsOfYear[month];
          const hov = getdate == dayOfMonth.toString();

          if (index < 8)
            return (
              <CarouselItem key={index} className={`basis-1/6 pl-[2px] `}>
                <Card
                  className={`h-[54px] w-[50px] border-none shadow-none ${
                    hov && "bg-[#f84464] text-white"
                  }`}
                >
                  <CardContent
                    className={`flex flex-col aspect-square items-center justify-center p-0 ${
                      !hov && "hover:text-red-400"
                    }  cursor-pointer`}
                  >
                    <Link
                      href={`?search=${movieId}&movie=${movie}&date=${nextDay.toLocaleDateString()}`}
                    >
                      <p className="text-xs">{dayName}</p>
                      <p className="text-sm font-semibold">{dayOfMonth}</p>
                      <p className="text-xs">{monthName}</p>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          else {
            return (
              <CarouselItem key={index} className="lg:basis-1/6 pl-[2px] ">
                <Card className="h-[54px] w-[50px] border-none shadow-none">
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-0"></CardContent>
                </Card>
              </CarouselItem>
            );
          }
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-[33px] rounded-none border-none hover:bg-white" />
      <CarouselNext className="absolute lg:-right-[25px] -right-[4px]   rounded-none h-[60px] lg:w-[50px] border-none hover:bg-white" />
    </Carousel>
  );
}
