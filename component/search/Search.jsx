import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'

export default function Search({ searchMovie, currentPage }) {
  const [input, setInput] = useState('')

  const onInputChangeEventHanlder = (event) => {
    const keyword = event.target.value
    setInput(keyword)
    searchMovie(input, keyword.length)
  }

  return (
    <div className="d-flex justify-content-center">
      <form>
        <div className="input-group flex-nowrap">
          <span className="input-group-text bg-dark" id="addon-wrapping">
            <Icon.Search color='white'/>
          </span>
          <input onChange={onInputChangeEventHanlder} type="text" className="form-control bg-dark text-white form-control-no-outline" placeholder={`search in page ${currentPage}`} aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
      </form>
    </div>
  )
}
