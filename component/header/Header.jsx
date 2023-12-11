import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid d-flex flex-row justify-content-between align-items-center">
        <a className="fw-bold fs-2 orange p-2 text-decoration-none" href="/">Mini Movie Library</a>
        <Link className='green fw-semibold fs-5 text-decoration-none' href="/random">Random Movie Picker</Link>
      </div>
    </nav>
  )
}
