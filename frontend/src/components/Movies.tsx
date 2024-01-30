import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface Movie {
  title: string;
  length: number;
  cast: string;
  year: number;
  genre: string;
  url: string;
  rating: number;
  _id: string;
}

const datafetch = async () => {
  const moviess = await axios.get("http://localhost:3001/api/v1/findmovie");
  return moviess.data;
};

const RecommendedMovies: React.FC = async () => {
  const movies: Movie[] = await datafetch();
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
      <div className="flex gap-4">
        {movies.map((movie, id) => (
          <Link
            key={id}
            className="bg-white p-4 rounded shadow"
            href={`/movie?search=${movie._id}`}
          >
            <Image src={movie.url} height={180} width={130} alt="no image" />
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
            <p className="text-gray-600 mb-2">{movie.genre}</p>
            <p className="text-gray-500">{movie.year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMovies;
