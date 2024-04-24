"use client";
import { Movie } from "@/components/Carousell";
import Mainheader from "@/components/Mainheaderlg";
import MediaRendering from "@/components/media-rendering";
import Subheader from "@/components/subheaderlg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "../loading";

const Page = () => {
  const searchParam = useSearchParams();
  const search = searchParam.get("search");
  const [moviedata, setmoviedata] = useState<Movie>();

  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/find_Single_movie/${search}`
        )
        .then((res) => res.data),

    queryKey: ["movie_id", search],
  });

  useEffect(() => {
    if (data) {
      setmoviedata({ ...data });
    }
  }, [data]);
  if (isLoading) return <LoadingPage />;
  return (
    <>
      <MediaRendering minWidth={null} maxWidth="600">
        <div className="w-full h-[238px] px-3 py-3 relative">
          <div className="rounded-lg overflow-hidden">
            <img src="/bms25.avif" alt="" className="h-full " />
            <div className="h-[35px] bg-black  flex justify-center items-center text-white">
              In Cimenas
            </div>
          </div>
        </div>
        <div className=" fixed bottom-0 left-0 w-screen h-14 px-4 py-2 bg-white border border-solid border-t-slate-200 lg:hidden">
          <Link
            href={`/movietoshoWpage?search=${moviedata?._id}&movie=${
              moviedata?.title
            }&date=${new Date().toLocaleDateString()}`}
          >
            <div className="w-full h-full bg-[#f84464] rounded-lg text-white flex items-center justify-center cursor-pointer">
              Book Tickets
            </div>
          </Link>
        </div>
      </MediaRendering>
      <MediaRendering minWidth="1024" maxWidth={null}>
        <Mainheader />
        <Subheader />
        <div className="bg-black h-[480px] relative  ">
          <div className="w-[1240px] h-full mx-auto  bg-[url('/sav.avif')] absolute left-[23%]">
            <div className=" bg-cover h-full w-screen bg-gradient-to-r from-black  ">
              <div className=" flex justify-end h-full w-full">
                <div className="flex absolute top-[40px] -left-[8.6%] overflow-hidden gap-8">
                  <img
                    src="poster1.jpg"
                    className="w-[261px] h-[392px] rounded-lg"
                    alt=""
                  />
                  <div className="flex flex-col gap-4">
                    <h1 className="text-white font-extrabold text-3xl">
                      {moviedata && moviedata.title}
                    </h1>
                    <Link
                      href={`/movietoshoWpage?search=${moviedata?._id}&movie=${
                        moviedata?.title
                      }&date=${new Date().toLocaleDateString()}`}
                    >
                      <div className="w-[216px] h-[51px] rounded-lg bg-[#f84464] font-semibold text-white flex items-center justify-center">
                        Book ticket
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="h-full w-[50px] bg-gradient-to-l from-black absolute top-0 right-0"></div>
              </div>
            </div>
          </div>
        </div>
      </MediaRendering>
    </>
  );
};

const Pagee = () => (
  <Suspense fallback={<LoadingPage />}>
    <Page />
  </Suspense>
);

export default Pagee;
