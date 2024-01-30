import { ShowType } from "@/app/seat/page";

interface FrameAProps {
  details: ShowType;
}

const FrameA: React.FC<FrameAProps> = ({ details }) => {
  const renderedFares = new Set<number>();
  let rowcount = details.seatmatrix.length;

  return (
    <div className="w-[661px] bg-white flex flex-col items-center justify-center  box-border gap-[20px] max-w-full text-left text-xs font-inter mq725:pt-[47px] ">
      {details.seatmatrix.map((row, rowIndex: number) => {
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
                <div className="self-stretch h-px relative box-border z-[1] border-t-[1px] border-solid border-black" />
              </div>

              <div
                className="w-[587px] flex py-0 px-0 box-border gap-6"
                key={rowIndex}
              >
                <div>{String.fromCharCode(65 + rowcount - 1 - rowIndex)}</div>
                {row.map((item, colIndex: number) => (
                  <div key={colIndex} className="w-[30px] h-[30px]">
                    {!(item.seatNumber == "XX") && (
                      <div
                        className={`flex items-center justify-center bg-white  px-1 py-1 ${
                          item.reference
                            ? "bg-slate-500 text-white"
                            : "border-2 border-solid border-green-600 hover:bg-green-600 cursor-pointer"
                        }`}
                      >
                        {rowindex++}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Render the row without the additional div
        return (
          <div
            key={rowIndex}
            className="w-[587px] flex py-0 px-0 box-border gap-6"
          >
            <div>{String.fromCharCode(65 + rowcount - 1 - rowIndex)}</div>
            {row.map((item, colIndex: number) => (
              <div key={colIndex} className="w-[30px] h-[30px]">
                {!(item.seatNumber == "XX") && (
                  <div
                    className={`flex items-center justify-center bg-white  px-1 py-1 ${
                      item.reference
                        ? "bg-slate-400 text-white pb-2"
                        : "border-2 border-solid border-green-600 hover:bg-green-600 cursor-pointer"
                    }`}
                  >
                    {rowindex++}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default FrameA;
