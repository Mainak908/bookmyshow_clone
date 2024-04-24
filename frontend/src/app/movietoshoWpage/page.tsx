"use client";

import Mainheader from "@/components/Mainheaderlg";
import { CarouselSize } from "@/components/MtoScar";
import Subheader from "@/components/subheaderlg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import LoadingPage from "../loading";

const Page = () => {
  const searchParam = useSearchParams();
  const search = searchParam.get("search");
  const movie = searchParam.get("movie");
  const initialDateParam = searchParam.get("date");
  const initialDate = initialDateParam
    ? new Date(initialDateParam)
    : new Date();

  const { data, isLoading, refetch } = useQuery({
    queryFn: () =>
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/movietoshow`, {
          movieId: search,
          date: initialDate,
        })
        .then((res) => res.data),

    queryKey: ["movieId", search, initialDate.toString()],
  });

  useEffect(() => {
    refetch();
  }, [initialDate, refetch]);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Mainheader />
      <Subheader />
      <div className="w-full border-b border-b-slate-300">
        <div className="w-full lg:w-[1240px] lg:h-[129px] h-[56px] mx-auto ">
          <h1 className="lg:text-3xl text-base lg:font-bold lg:my-4">
            {movie}
          </h1>
        </div>
      </div>

      <div className=" w-full lg:w-[1240px] h-16 mx-auto">
        <CarouselSize />
      </div>

      <div className="bg-zinc-100 h-full">
        <div className="w-full px-4 lg:px-0 lg:w-[1240px] mx-auto py-5">
          {data &&
            Object.values(
              data.reduce((acc, theatre) => {
                if (!acc[theatre.theatreName]) {
                  acc[theatre.theatreName] = {
                    theatreName: theatre.theatreName,
                    times: [],
                  };
                }
                acc[theatre.theatreName].times.push(theatre);
                return acc;
              }, {})
            ).map((theatre: any, index) => (
              <div
                className="border-b-[1px] border-b-zinc-700 border-opacity-10"
                key={index}
              >
                <div className="bg-white px-4 py-[13px] flex flex-wrap items-center">
                  <div className="w-[336px] ">
                    <p className="text-xs font-semibold">
                      {theatre.theatreName}:{theatre.times[0].location}
                    </p>
                  </div>
                  <div className="w-[840px] flex gap-4 ">
                    {theatre.times.map((time, index) => {
                      const currentDateTime = new Date(time.time);
                      const currentHour = currentDateTime.getHours();
                      const currentMinute = currentDateTime.getMinutes();
                      const formattedHour =
                        currentHour < 10 ? "0" + currentHour : currentHour;
                      const formattedMinute =
                        currentMinute < 10
                          ? "0" + currentMinute
                          : currentMinute;

                      return (
                        <div
                          key={index}
                          className="w-[92px] lg:w-[110px] h-10 border border-black rounded-md flex justify-center items-center text-green-500 border-opacity-30"
                        >
                          <Link href={`/seat?search=${time._id}`}>
                            {`${formattedHour}: ${formattedMinute}`}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
const Pagee = () => (
  <Suspense fallback={<LoadingPage />}>
    <Page />
  </Suspense>
);
export default Pagee;
