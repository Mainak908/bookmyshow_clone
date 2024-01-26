"use client";
import React from "react";
import HeaderCmp from "@/components/header";
import FrameA from "@/components/FrameA";
// React component
const SeatSelection = () => {
  return (
    <div>
      <HeaderCmp />
      <div className="w-full h-screen flex relative bg-lightgray overflow-hidden  items-center justify-center   box-border tracking-[normal] mq450:pl-5 mq450:pr-5 mq450:box-border mq725:pl-[52px] mq725:pr-[52px] mq725:box-border mq1050:pl-[104px] mq1050:pr-[104px] mq1050:box-border">
        <FrameA />
      </div>
    </div>
  );
};

export default SeatSelection;
