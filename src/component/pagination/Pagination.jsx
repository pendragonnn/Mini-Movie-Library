import React from 'react'

export default function Pagination({ currentPage, totalPage, onPaginationNextHandler, onPaginationPreviousHandler}) {
  return (
    <div className="container d-flex align-items-end flex-column mx-auto">
      <ul className="pagination">
        {currentPage !== 1 && (
          <li className="page-item"><button className="page-link text-warning bg-secondary" onClick={() => onPaginationPreviousHandler(currentPage)}>Previous</button></li>
        )}
        <li className="page-item">
          <span className="page-link bg-dark text-warning">{currentPage}</span>
        </li>
        {currentPage !== totalPage && (
          <li className="page-item"><button className="page-link text-warning bg-secondary" onClick={() => onPaginationNextHandler(currentPage)}>Next</button></li>
        )}
      </ul>
      <small className="d-block">Page: {currentPage} / {totalPage}</small>
    </div>
  )
}
