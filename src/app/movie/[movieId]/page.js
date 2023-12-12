"use client";

import React, { useState, useEffect } from "react";
import Typed from "react-typed";
import MovieDetail from "@/component/movies/MovieDetail";

export default function Page({ params }) {
  const [isMovieFound, setIsMovieFound] = useState(false);
  const [movie, setMovie] = useState([]);
  const movieId = params.movieId;
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

      setIsLoading(false);
      setMovie(movie);
      setIsMovieFound(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovieData(movieId);
  }, [movieId]);

  return (
    <div className="container d-flex flex-column align-items-center mt-3">
      {isMovieFound && !isLoading && <MovieDetail movieData={movie} />}

      {isLoading && (
        <div className="d-flex vh-100 justify-content-center fw-bold align-items-center green h-100">
          <Typed strings={["Loading..."]} typeSpeed={10} />
        </div>
      )}
    </div>
  );
}
