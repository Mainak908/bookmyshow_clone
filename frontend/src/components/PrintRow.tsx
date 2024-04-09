"use client";

import { matrixElement } from "@/app/seat/page";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface PrintRowProps {
  row: matrixElement[];
  rowIndex: number;
  rowcount: number;
  rowindex: number;
  selectedSeat: any[];
  setselectedSeat: Dispatch<SetStateAction<any>>;
  setItem: any;
  item: any;
}

export const PrintRow: React.FC<PrintRowProps> = ({
  row,
  rowIndex,
  rowcount,
  rowindex,
  selectedSeat,
  setselectedSeat,
  setItem,
  item,
}) => {
  const selectfn = (ri: number, coli: number, fare: number) => {
    if (selectedSeat.length === 3) return;
    setselectedSeat((prev: any) => [...prev, [ri, coli]]);
    changeQuantity(item.quantity + 1, fare);
  };
  const checkfn = (ri: number, coli: number) => {
    for (const [row, col] of selectedSeat) {
      if (row === ri && col === coli) {
        return true;
      }
    }
    return false;
  };

  const changeQuantity = (value: number, fare: number) => {
    setItem((prev: any) => ({
      ...prev,
      quantity: prev.quantity + 1,
      fare: prev.fare + fare,
    }));
  };

  return (
    <div className="flex gap-6" key={rowIndex}>
      <div className="flex items-center  justify-center">
        {String.fromCharCode(65 + rowcount - 1 - rowIndex)}
      </div>
      {row.map((item, colIndex) =>
        !(item.seatNumber == "XX") ? (
          <button
            key={colIndex}
            className={cn(
              "w-[24px] h-[24px] flex items-center  justify-center bg-white rounded-sm",
              {
                "bg-slate-500 text-white border-[1px] border-solid border-slate-500":
                  item.reference || item.islocked,
                "bg-green-600": checkfn(rowIndex, colIndex),
                "border-[1px] border-solid border-[#1ea83c] hover:bg-green-600 cursor-pointer ":
                  !checkfn(rowIndex, colIndex) &&
                  !item.reference &&
                  !item.islocked,
              }
            )}
            onClick={() => selectfn(rowIndex, colIndex, item.fare)}
            disabled={
              checkfn(rowIndex, colIndex) || !!item.reference || !!item.islocked
            }
          >
            {rowindex++}
          </button>
        ) : (
          <button
            key={colIndex}
            className="w-[25px] h-[25px]"
            disabled
          ></button>
        )
      )}
    </div>
  );
};
