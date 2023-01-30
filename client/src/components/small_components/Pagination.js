import React from 'react'

export const Pagination = ({mountsPerPage, totalMounts, paginate}) => {

    const mountNumbers = [];

    for(let i=1; i<=Math.ceil(totalMounts/mountsPerPage);i++){
        mountNumbers.push(i)

    }


  return (
    <div className="pagination-container">
        <ul className="test">
            {mountNumbers.map((number, index) => (
                <li key={index}  >
                    <a onClick={() => paginate(number, index)}href="#" >
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </div>
  )
}
