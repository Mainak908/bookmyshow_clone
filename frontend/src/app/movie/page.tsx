"use client";
import { Movie } from "@/components/Movies";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParam = useSearchParams();
  const search = searchParam.get("search");
  const [moviedata, setmoviedata] = useState<Movie>();
  useEffect(() => {
    axios
      .post("http://localhost:3001/api/v1/find_Single_movie", {
        movie_id: search,
      })
      .then((data) => data.data)
      .then((data) => setmoviedata({ ...data }));
  }, []);

  return (
    <div className="flex gap-5">
      <div>{moviedata && moviedata.title}</div>
      <Link
        href={`/movietoshoWpage?search=${moviedata?._id}`}
        className=" p-4 rounded-2xl bg-blue-300 "
      >
        book ticket
      </Link>
    </div>
  );
};

export default page;
