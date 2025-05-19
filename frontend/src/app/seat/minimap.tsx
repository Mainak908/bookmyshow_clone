const Grid = ({ rows, cols }) => {
  const highlightedArea = {
    startRow: 2,
    startCol: 13,
    endRow: 6,
    endCol: 22,
  };

  const grid = [];

  for (let row = 0; row < rows; row++) {
    const rowCells = [];
    for (let col = 0; col < cols; col++) {
      const isHighlighted =
        row >= highlightedArea.startRow &&
        row <= highlightedArea.endRow &&
        col >= highlightedArea.startCol &&
        col <= highlightedArea.endCol;

      rowCells.push(
        <div
          key={`${row}-${col}`}
          className={`w-6 h-6 border border-yellow-400 flex items-center justify-center text-sm ${
            isHighlighted ? "border-red-500" : ""
          }`}
        ></div>
      );
    }
    grid.push(
      <div key={row} className="flex">
        {rowCells}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-25 gap-1">
      <div className="col-span-13 flex justify-end pr-2">
        {grid.slice(0, 2)}
      </div>
      <div className="col-span-12 flex justify-center">{grid.slice(2, 7)}</div>
      <div className="col-span-13 flex justify-start pl-2">{grid.slice(7)}</div>
    </div>
  );
};

export default Grid;
