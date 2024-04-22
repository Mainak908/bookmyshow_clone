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
        .get(`http://localhost:3001/api/v1/find_Single_movie/${search}`)
        .then((res) => res.data),

    queryKey: ["movie_id", search],
    staleTime: 100000,
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
        <div className="bg-black h-[480px] ">
          <div className="w-[1240px] h-[480px] mx-auto  bg-[url('/sav.avif')]">
            <div className="bg-gradient-to-r from-black to-transparent h-full w-full">
              <div className="py-10 px-10">
                <div className="flex relative overflow-hidden">
                  <img
                    src="poster1.jpg"
                    className="w-[261px] h-[392px] "
                    alt=""
                  />
                  <div className="flex flex-col gap-4">
                    <h1 className="text-white font-bold text-2xl">
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
