// Seat.js

import React from "react";

const Seat = ({ available, onClick }) => {
  const seatStyle = `w-8 h-8 rounded-full ${
    available ? "bg-green-500" : "bg-red-500"
  }`;

  return (
    <div className={`cursor-pointer ${seatStyle}`} onClick={onClick}></div>
  );
};

export default Seat;
