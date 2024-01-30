"use client";
import React, { useEffect, useState } from "react";
import HeaderCmp from "@/components/header";
import FrameA from "@/components/FrameA";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface matrixElement {
  reference: string;
  seatNumber: string;
  fare: number;
}
export interface ShowType {
  movie: string;
  theatre: string;
  time: Date;
  seatmatrix: matrixElement[][];
}
const SeatSelection = () => {
  const searchParam = useSearchParams();
  const [showdesc, setshowdesc] = useState<ShowType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = searchParam.get("search");
    axios
      .post("http://localhost:3001/api/v1/findshowbyid", {
        showId: search,
      })
      .then((data) => data.data)
      .then((data) => {
        setshowdesc({ ...data });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching show details:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!showdesc) {
    return <div>Error fetching show details</div>;
  }

  return (
    <div>
      <HeaderCmp details={showdesc.theatre} />
      <div className="w-full h-screen flex relative bg-lightgray overflow-hidden  items-center justify-center   box-border tracking-[normal] mq450:pl-5 mq450:pr-5 mq450:box-border mq725:pl-[52px] mq725:pr-[52px] mq725:box-border mq1050:pl-[104px] mq1050:pr-[104px] mq1050:box-border">
        {<FrameA details={showdesc} />}
      </div>
    </div>
  );
};

export default SeatSelection;
