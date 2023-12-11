"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Search from "../search/Search";
import Typed from 'react-typed'

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
                  <h4>{movie.original_title}</h4>
                  <div className="mb-2">
                    <span className="mbr-3 green">{movie.overview}</span>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <button className="btn btn-warning w-100 fw-bold">
                      {" "}
                      See Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container d-flex align-items-end flex-column mx-auto">
            <ul className="pagination">
              {currentPage !== 1 && (
                <li className="page-item"><button className="page-link text-warning bg-secondary" onClick={() => onPaginationPreviousHandler(currentPage)}>Previous</button></li>
              )}
              <li className="page-item bg-dark">
                <span className="page-link text-warning">{currentPage}</span>
              </li>
              {currentPage !== totalPage && (
                <li className="page-item"><button className="page-link text-warning bg-secondary" onClick={() => onPaginationNextHandler(currentPage)}>Next</button></li>
              )}
            </ul>
            <small className="d-block">Page: {currentPage} / {totalPage}</small>
          </div>
        </div>
      )}
    </div>
  );
}

