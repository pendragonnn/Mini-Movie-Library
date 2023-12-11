"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Search from "../search/Search";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([])
  const [searchNotFound, setSearchNotFound] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchMovieData = (page) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGMzNGNjNTVjZTQ1YmFkMDNjZDMwMjcyODE4MTM5ZSIsInN1YiI6IjY1NzY4NGJjZWMzNzBjMDEzYWVkZGViNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wZFXl2js3KVKTW8GaeLGS4YCN_DXOLLqxX1ipNvlSJ8",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((movie) => {
        setMovies(movie.results);
        setOriginalMovies(movie.results)
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    // fetch api
    fetchMovieData(currentPage)
  }, [currentPage]);

  const onSearchMovieHandler = (title, length) => {
    if (length === 0) {
      fetchMovieData(currentPage)
      setSearchNotFound(false)
    } else {
      const result = originalMovies.filter((movie) =>
        movie.original_title.toLowerCase().includes(title.toLowerCase())
      );

      result.length === 0 ? setSearchNotFound(true) : setSearchNotFound(false)

      setMovies(result);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-evenly align-items-center mt-4">
        <div className="fs-3 fw-bold green">Top Rated Movie</div>
        <Search searchMovie={onSearchMovieHandler} currentPage={currentPage} />
      </div>
      {searchNotFound && (
        <div className="d-flex justify-content-center m-3">
          <p className="bg-danger p-2 text-white rounded">Movie Not Found</p>
        </div>
      )}
      <div className="container movie-section text-white w-100 my-3">
        {movies.map((movie, id) => (
          <div className="movie m-2 rounded" key={id}>
            <div>
              <Image src={'https://www.themoviedb.org/t/p/original/' + movie.poster_path} alt="Image" width={300} height={400} />
            </div>
            <div className="movie-info">
              <h3 className="fw-bold">{movie.original_title}</h3>
              <div className="d-flex flex-column justify-content-start align-items-start gap-1">
                <span className="orange fw-bold">Vote: {movie.vote_average.toFixed(2)}</span>
                <span className="green">Released: {movie.release_date}</span>
              </div>
            </div>
            <div className="overview">
              <h4>Title</h4>
              <div className="mb-2">
                <span className="mbr-3 green">genres</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <button className="btn btn-warning w-100 fw-bold">
                  {" "}
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}