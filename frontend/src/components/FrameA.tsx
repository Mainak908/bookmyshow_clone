"use client";
import { ShowType } from "@/app/seat/page";

import { PrintRow } from "./PrintRow";

interface FrameAProps {
  details: ShowType;
  selectedSeat: any[];
  setselectedSeat: any;
  setItem: any;
  item: any;
}

const FrameA: React.FC<FrameAProps> = ({
  details,
  selectedSeat,
  setselectedSeat,
  setItem,
  item,
}) => {
  const renderedFares = new Set<number>();
  let rowcount = details.seatmatrix.length;

  // console.log(selectedSeat);
  return (
    <div className="w-[661px] bg-white flex flex-col items-center justify-center  box-border gap-[20px] max-w-full text-left text-xs font-inter mq725:pt-[47px] ">
      {details.seatmatrix.map((row, rowIndex) => {
        let rowindex = 1;

        // Render the div for the starting occurrence of a fare
        if (row[0].fare != -1 && !renderedFares.has(row[0].fare)) {
          renderedFares.add(row[0].fare);
          return (
            <div key={rowIndex} className="">
              <div className="self-stretch h-[21px] flex flex-col items-start justify-start gap-[6px] mb-3">
                <div className="flex items-start justify-start py-0 px-[15px]">
                  <div className="">PREMIUM RS {row[0].fare}</div>
                </div>
                <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-slate-200 " />
              </div>

              <PrintRow
                row={row}
                rowIndex={rowIndex}
                rowcount={rowcount}
                rowindex={rowindex}
                selectedSeat={selectedSeat}
                setselectedSeat={setselectedSeat}
                key={rowIndex}
                setItem={setItem}
                item={item}
              />
            </div>
          );
        }

        // Render the row without the additional div
        return (
          <PrintRow
            row={row}
            rowIndex={rowIndex}
            rowcount={rowcount}
            rowindex={rowindex}
            selectedSeat={selectedSeat}
            setselectedSeat={setselectedSeat}
            key={rowIndex}
            setItem={setItem}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default FrameA;
