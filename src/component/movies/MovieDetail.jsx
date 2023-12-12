import React from 'react'
import Image from "next/image";
import * as Icon from "react-bootstrap-icons";

export default function MovieDetail({ movieData }) {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center flex-lg-row my-4 gap-3 w-75">
      <div>
        {movieData.poster_path ? (
          <Image
            src={
              "https://www.themoviedb.org/t/p/original/" + movieData.poster_path
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
      <div >
        <h3 className="text-warning text-center text-md-start">
          {movieData.original_title} <small class="badge rounded-pill text-bg-secondary fs-6">language: {movieData.original_language}</small>
        </h3>
        {movieData.tagline && <small className="green">{movieData.tagline}</small>}

        <div className="d-flex justify-content-start align-items-center gap-3">
          {movieData.status === "Released" ? (
            <div className="text-white">
              {movieData.status}: {movieData.release_date}
            </div>
          ) : (
            <div>{movieData.status}</div>
          )}
          <small className="orange">Duration: {movieData.runtime} minutes</small>
          <div className="d-flex flex-row align-items-center text-warning my-2 gap-1">
            <Icon.StarFill />
            <div className="text-white">
              {movieData.vote_average.toFixed(2)}
            </div>
          </div>
        </div>
        {movieData.genres.length !== 0 && (
          <div className="d-flex gap-1 my-1">
            {movieData.genres.map((genre) => (
              <div className="green border p-1" key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
        )}

        <p className="text-white overflow-auto">
          {movieData.overview}
        </p>
      </div>
    </div>
  )
}
