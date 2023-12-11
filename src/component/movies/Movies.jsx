"use client";
import React, { useEffect, useState } from "react";
import Search from "../search/Search";
import Typed from 'react-typed'
import MovieCard from "./MovieCard";
import Pagination from "../pagination/Pagination";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0)

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
        setIsLoading(false);
        setOriginalMovies(movie.results);
        setTotalPage(movie.total_pages)
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // fetch api
    fetchMovieData(currentPage);
  }, [currentPage]);

  const onSearchMovieHandler = (title, length) => {
    if (length === 0) {
      fetchMovieData(currentPage);
      setSearchNotFound(false);
    } else {
      const result = originalMovies.filter((movie) =>
        movie.original_title.toLowerCase().includes(title.toLowerCase())
      );

      result.length === 0 ? setSearchNotFound(true) : setSearchNotFound(false);

      setMovies(result);
    }
  };

  const onPaginationNextHandler = (currentPage) => {
    setCurrentPage(currentPage + 1)
    setIsLoading(true)
  }

  const onPaginationPreviousHandler = (currentPage) => {
    if (currentPage === 1) {
      return
    }
    setIsLoading(true)
    setCurrentPage(currentPage - 1)
  }

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center fw-bold align-items-center vh-100">
          <Typed strings={['Loading...']} typeSpeed={10} />
        </div>
      ) : (
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
              <MovieCard key={id} movieData={movie}/>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPage={totalPage} onPaginationNextHandler={onPaginationNextHandler} onPaginationPreviousHandler={onPaginationPreviousHandler}/>
        </div>
      )}
    </div>
  );
}

