"use client";
import Mainheader from "@/components/Mainheader";
import Subheader from "@/components/subheader";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const searchParam = useSearchParams();
  const [theatrelist, settheatrelist] = useState<any[]>([]);

  const search = searchParam.get("search");
  useEffect(() => {
    axios
      .post("http://localhost:3001/api/v1/movietoshow", {
        movieId: search,
      })
      .then((data) => data.data)
      .then((data) => settheatrelist([...data]));
  }, []);
  return (
    <div>
      <Mainheader />
      <Subheader />
      {theatrelist.map((theatre, key) => (
        <div key={key} className=" mb-4 flex gap-5">
          <Link href={`/movietoshoWpage?search=${""}`}>
            {theatre.theatreName}
          </Link>
          <Link href={`/seat?search=${theatre._id}`}>
            {new Date("2024-02-05T13:30:00.000Z").getHours()}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default page;
