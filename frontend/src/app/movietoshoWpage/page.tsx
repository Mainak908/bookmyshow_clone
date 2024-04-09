"use client";

import Mainheader from "@/components/Mainheaderlg";
import { CarouselSize } from "@/components/MtoScar";
import Subheader from "@/components/subheaderlg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "../loading";

const Page = () => {
  const searchParam = useSearchParams();
  const [theatrelist, settheatrelist] = useState<any[]>();
  const search = searchParam.get("search");
  const movie = searchParam.get("movie");
  // console.log(search);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios
        .post("http://localhost:3001/api/v1/movietoshow", {
          movieId: search,
        })
        .then((res) => res.data),

    queryKey: ["movieId"],
  });
  //

  useEffect(() => {
    if (data) {
      // console.log(data);
      settheatrelist([...data]);
    }
  }, [data]);
  if (isLoading) return <LoadingPage />;
  return (
    <>
      <Mainheader />
      <Subheader />
      <div>
        <h1 className="text-3xl font-bold my-4">{movie} </h1>
      </div>
      <div className="w-[1240px] h-16 mx-auto"></div>

      <div className="bg-zinc-100 h-full">
        <div className=" w-[1240px] mx-auto py-5">
          {data &&
            theatrelist?.map((theatre, index) => (
              <div
                className=" border-b-[1px] border-b-zinc-700 border-opacity-10 "
                key={index}
              >
                <div
                  key={index}
                  className="bg-white px-4 py-[13px] flex h-[110px]"
                >
                  <div className="w-[336px] ">
                    <p className="text-xs font-semibold">
                      {theatre.theatreName}:{theatre.location}
                    </p>
                  </div>
                  <div className="w-[840px] flex gap-4 ">
                    <div className="w-[110px] h-10 border border-black rounded-md flex justify-center items-center text-green-500 border-opacity-30">
                      <Link href={`/seat?search=${theatre._id}`}>text</Link>
                    </div>
                    <div className="w-[110px] h-10 border border-black rounded-md flex justify-center items-center text-green-500 border-opacity-30">
                      text
                    </div>
                    <div className="w-[110px] h-10 border border-black rounded-md flex justify-center items-center text-green-500 border-opacity-30">
                      text
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <CarouselSize />
    </>
  );
};
const Pagee = () => (
  <Suspense fallback={<LoadingPage />}>
    <Page />
  </Suspense>
);
export default Pagee;
