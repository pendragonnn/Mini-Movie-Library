"use client";

import React, { useState } from "react";
import Typed from "react-typed";
import MovieDetail from "@/component/movies/MovieDetail";

export default function Random() {
  const [isMovieFound, setIsMovieFound] = useState(false);
  const [movie, setMovie] = useState([]);
  const [id, setId] = useState(Math.floor(Math.random() * 100000));
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieData = async (id) => {
    setIsLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGMzNGNjNTVjZTQ1YmFkMDNjZDMwMjcyODE4MTM5ZSIsInN1YiI6IjY1NzY4NGJjZWMzNzBjMDEzYWVkZGViNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wZFXl2js3KVKTW8GaeLGS4YCN_DXOLLqxX1ipNvlSJ8",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );
      const movie = await response.json();

      if (movie.status_code === 34) {
        fetchMovieData(Math.floor(Math.random() * 100000));
        return;
      } else {
        setIsLoading(false);
        setMovie(movie);
        setIsMovieFound(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onGenerateButtonClicked = () => {
    const movieId = Math.floor(Math.random() * 100000);
    setId(movieId);

    fetchMovieData(id);
  };

  return (
    <div className="container vh-100 d-flex flex-column align-items-center">
      <h1 className="text-center mt-4 green">Random Movie Picker</h1>
      <p className="text-white">
        Click the &quot;generate&quot; button to start
      </p>
      <button
        className="btn bg-warning text-black fw-bold p-2 rounded"
        onClick={() => onGenerateButtonClicked()}
      >
        Generate
      </button>
      {isMovieFound && !isLoading && (
        <MovieDetail movieData={movie}/>
      )}

      {isLoading && (
        <div className="d-flex justify-content-center fw-bold align-items-center green h-100">
          <Typed strings={["Picking ur Movie..."]} typeSpeed={10} />
        </div>
      )}
    </div>
  );
}
