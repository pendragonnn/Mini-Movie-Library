import React from 'react'
import Image from 'next/image'

export default function MovieCard( {movieData} ) {
  return (
    <div className="movie m-2 rounded">
      <div>
        <Image src={'https://www.themoviedb.org/t/p/original/' + movieData.poster_path} alt="Image" width={200} height={300} />
      </div>
      <div className="movie-info">
        <h3 className="fw-bold">{movieData.original_title}</h3>
        <div className="d-flex flex-column justify-content-start align-items-start gap-1">
          <span className="orange fw-bold">Vote: {movieData.vote_average}</span>
          <span className="green">Released: {movieData.release_date}</span>
        </div>
      </div>
      <div className="overview">
        <h4>{movieData.original_title}</h4>
        <div className="mb-2">
          <span className="mbr-3 green">{movieData.overview}</span>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <button className="btn btn-warning w-100">
            {" "}
            <a className='fw-bold text-decoration-none text-black' href={`/movie/${movieData.id}`}>See Detail</a>
          </button>
        </div>
      </div>
    </div>
  )
}
