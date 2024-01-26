"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:3001"); // Update with your server URL

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleUpdateMovies = (updatedMovies) => {
      setMovies(updatedMovies);
    };

    // Set up the socket event listener
    socket.on("updateMovies", handleUpdateMovies);

    // Fetch initial movie data
    axios
      .get("http://localhost:3001/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movie data:", error));

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("updateMovies", handleUpdateMovies);
    };
  }, [movies]); // Use the 'movies' state as a dependency

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setSelectedSeat("");
    setUserName("");
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBooking = () => {
    if (selectedMovie && selectedSeat && userName) {
      axios
        .post("http://localhost:3001/api/book", {
          movieId: selectedMovie._id,
          seat: selectedSeat,
          user: userName,
        })
        .then(() => {
          // Do nothing here, as the real-time update is handled through the socket event
        })
        .catch((error) => console.error("Error booking seat:", error));
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">
        Movie Ticket Booking System
      </h1>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-2">Movies</h2>
          <ul className="list-disc pl-4">
            {movies.map((movie) => (
              <li
                key={movie._id}
                onClick={() => handleMovieSelect(movie)}
                className="cursor-pointer hover:text-blue-500 transition duration-300"
              >
                {movie.title}
              </li>
            ))}
          </ul>
        </div>
        {selectedMovie && (
          <div className="w-1/2 pl-4">
            <h2 className="text-xl font-semibold mb-2">
              Selected Movie: {selectedMovie.title}
            </h2>
            <h3 className="text-lg font-semibold mb-2">Available Seats</h3>
            <ul className="flex flex-wrap">
              {selectedMovie.bookings.map((booking) => (
                <li
                  key={booking.seat}
                  onClick={() => handleSeatSelect(booking.seat)}
                  className={`w-1/4 p-2 mb-2 mr-2 rounded ${
                    booking.user ? "bg-red-500" : "bg-green-500"
                  } text-white cursor-pointer hover:bg-blue-500 transition duration-300`}
                >
                  {booking.seat} - {booking.user || "Available"}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="p-2 mr-2 border rounded"
              />
              <button
                onClick={handleBooking}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                Book Seat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
