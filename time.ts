// Create a new Date object
// const currentDateTime = new Date();

// // Get the current date and time components
// const currentDate = currentDateTime.toLocaleDateString(); // Date in format MM/DD/YYYY
// const currentTime = currentDateTime.toLocaleTimeString(); // Time in format HH:MM:SS

// console.log("Current Date:", currentDate);
// console.log("Current Time:", currentTime);

// // Get the current hour and minute components
// const currentHour = currentDateTime.getHours(); // Gets the hour (0-23)
// const currentMinute = currentDateTime.getMinutes(); // Gets the minute (0-59)

// // Format the hour and minute components
// const formattedHour = currentHour < 10 ? '0' + currentHour : currentHour; // Add leading zero if needed
// const formattedMinute = currentMinute < 10 ? '0' + currentMinute : currentMinute; // Add leading zero if needed

// // Combine the formatted hour and minute into a string
// const currentTime = `${formattedHour}:${formattedMinute}`;

// console.log("Current Time (Hour:Minute):", currentTime);

// Get the weekday and month names
// const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// const currentWeekday = weekdays[currentDateTime.getDay()]; // Get the weekday name
// const currentMonth = months[currentDateTime.getMonth()]; // Get the month name

// console.log("Current Weekday:", currentWeekday);
// console.log("Current Month:", currentMonth);

// // Parse the date string
// const date = new Date("2024-04-17T18:30:00.000Z");

// const [hours, minutes] = timeString.split(":").map(Number);

// console.log(date.getHours());
// date.setUTCMinutes(minutes);

// console.log(date);

// const today = new Date();
// today.setHours(0, 0, 0, 0); // Set time to 12:00 AM
// console.log(today);

// const tomorrow = new Date();
// tomorrow.setDate(today.getDate() + 1); // Get tomorrow's date
// tomorrow.setHours(0, 0, 0, 0);

// console.log(startOfDay, endOfDay);

// console.log(today);

// const dateString = "2024-04-18";
// const timeString = "09:00";

// const date = new Date(dateString);
// const [hours, minutes] = timeString.split(":").map(Number);

// date.setUTCHours(hours);
// date.setUTCMinutes(minutes);

// console.log(date);
const currentDateTime = new Date();
const nextDay = new Date(currentDateTime);
console.log(currentDateTime.getDate() + 1);
// console.log(nextDay);

//https://res.cloudinary.com/dddm02rvi/image/upload/v1711804651/mkurpkqhlid7ua5uboct.webp
