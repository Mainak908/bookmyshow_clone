"use client";

import React, { useState } from "react";
import Seat from "./Seat";

const SeatLayout = () => {
  // Assuming a simple grid layout
  const rows = 5;
  const seatsPerRow = 10;

  // Initialize seats with default availability
  const [seatStatus, setSeatStatus] = useState(
    Array(rows * seatsPerRow).fill(true)
  );

  // Function to toggle seat availability
  const toggleSeat = (index) => {
    const newSeatStatus = [...seatStatus];
    newSeatStatus[index] = !newSeatStatus[index];
    setSeatStatus(newSeatStatus);
  };

  return (
    <div className="flex flex-col items-center">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
            const index = rowIndex * seatsPerRow + seatIndex;
            return (
              <Seat
                key={seatIndex}
                available={seatStatus[index]}
                onClick={() => toggleSeat(index)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatLayout;
