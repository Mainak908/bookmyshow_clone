"use client";
import { Movie } from "@/components/Carousell";
import Mainheader from "@/components/Mainheaderlg";
import Subheader from "@/components/subheaderlg";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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
  // console.log(data);
  useEffect(() => {
    if (data) {
      setmoviedata({ ...data });
    }
  }, [data]);
  if (isLoading) return <div>loading.........</div>;
  return (
    <div>
      <Mainheader />
      <Subheader />
      <div className="bg-black h-[480px] ">
        <div className="w-[1240px] h-[480px] mx-auto  bg-[url('/sav.avif')]">
          <div className="bg-gradient-to-r from-black to-transparent h-full w-full">
            <div className="py-10 px-10">
              <div className="flex">
                <img
                  src="poster1.jpg"
                  className="w-[261px] h-[392px] rounded-[10px] ml-3"
                  alt=""
                />
                <div className="flex flex-col gap-4">
                  <h1 className="text-white font-bold text-2xl">
                    {moviedata && moviedata.title}
                  </h1>
                  <Link
                    href={`/movietoshoWpage?search=${moviedata?._id}&movie=${moviedata?.title}`}
                    className=" p-4 rounded-2xl bg-blue-300 "
                  >
                    book ticket
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagee = () => (
  <Suspense fallback={"loading..."}>
    <Page />
  </Suspense>
);

export default Pagee;
