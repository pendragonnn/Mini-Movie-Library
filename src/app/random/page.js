"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Typed from "react-typed";
import Image from "next/image";
import * as Icon from "react-bootstrap-icons";

export default function Random() {
  const [isMovieFound, setIsMovieFound] = useState(false);
  const [movie, setMovie] = useState([]);
  const [id, setId] = useState(Math.floor(Math.random() * 100000));
  const [isLoading, setIsLoading] = useState(null);

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
        <div className="container d-flex justify-content-center my-3 vh-100 gap-4 ">
          <div>
            {movie.poster_path ? (
              <Image
                src={
                  "https://www.themoviedb.org/t/p/original/" + movie.poster_path
                }
                alt="Image"
                width={200}
                height={300}
              />
            ) : (
              <Image
                src={
                  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1255/image-not-found.svg"
                }
                alt="Image"
                width={200}
                height={300}
                className="border border-white"
              />
            )}
          </div>
          <div className="w-50">
            <h3 className="text-warning">
              {movie.original_title} <small class="badge rounded-pill text-bg-secondary fs-6">language: {movie.original_language}</small> 
            </h3>
            {movie.tagline && <small className="green">{movie.tagline}</small>}

            <div className="d-flex justify-content-between align-items-center">
              {movie.status === "Released" ? (
                <div className="text-white">
                  {movie.status}: {movie.release_date}
                </div>
              ) : (
                <div>{movie.status}</div>
              )}
              <small className="orange">Duration: {movie.runtime} minutes</small>
              <div className="d-flex flex-row align-items-center text-warning my-2 gap-1">
                <Icon.StarFill />
                <div className="text-white">
                  {movie.vote_average.toFixed(2)}
                </div>
              </div>
            </div>
            {movie.genres.length !== 0 && (
              <div className="d-flex gap-1 my-1">
                {movie.genres.map((genre) => (
                  <div className="green border p-1" key={genre.id}>
                    {genre.name}
                  </div>
                ))}
              </div>
            )}

            <p className="text-white overflow-auto max-height-100 h-50">
              {movie.overview}
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="d-flex justify-content-center fw-bold align-items-center green h-100">
          <Typed strings={["Picking ur Movie..."]} typeSpeed={10} />
        </div>
      )}
    </div>
  );
}
