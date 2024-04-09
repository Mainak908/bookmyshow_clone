export function generateSeatMatrix(
  rows: number,
  fares: { rows: number; fare: number }[],
  bad: number[][]
) {
  const seatMatrix: any[] = [];

  for (let i = 1; i <= rows; i++) {
    const row: any[] = [];

    for (let j = 1; j <= 5; j++) {
      if (bad.some((pair) => pair[0] === i && pair[1] === j)) {
        row.push({
          seatNumber: "XX",
          fare: -1,
        });
      } else {
        const fareObj = fares.find((fareConfig) => i <= fareConfig.rows);
        const fare = fareObj ? fareObj.fare : -1;

        // Assuming a seat number format like 'A1', 'A2', ...
        const seatNumber = `${String.fromCharCode(65 + i - 1)}${j}`;
        row.push({
          seatNumber,
          fare,
        });
      }
    }

    seatMatrix.push(row);
  }

  return seatMatrix;
}
export function generateRandomDate() {
  const currentDate = new Date();
  const nextWeek = new Date(currentDate);
  nextWeek.setDate(currentDate.getDate() + 7); // Set date to a week from now

  // Set time to 7 PM
  nextWeek.setHours(19, 0, 0, 0);

  // Random time within 24 hours
  const randomDate = new Date(nextWeek.getTime());

  return randomDate;
}