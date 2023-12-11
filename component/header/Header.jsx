import React from 'react'
import Link from 'next/link'

export default function Header() {


  return (
    <div className='w-100 '>
      <div className='d-flex flex-row justify-content-between align-items-center w-100'>
        <h1 className='fw-bold'>MovieMingle</h1>
        <form id='form text-white' 
          // onSubmit={handleSubmit}
        >
          <input type="text" id='search' className='search' placeholder='Search' 
          // onChange={handleOnSearch}
          />
        </form>
      </div>
    </div>
  )
}
