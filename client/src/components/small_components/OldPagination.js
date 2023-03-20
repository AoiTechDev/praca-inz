import React, {useState} from "react";

export const Pagination = ({
  mountsPerPage,
  totalMounts,
  paginate,
  collectionState,
  setCurrentMountPage,
  currentMountPage
}) => {
  const mountNumbers = [];
  const [page, setPage] = useState([])
  for (let i=1;i<6;i++){
    page.push(i)
  }
  for (let i = 1; i <= Math.ceil(totalMounts / mountsPerPage); i++) {
    mountNumbers.push(i);
  }
 
  return (
    <div className="pagination-container">
      <ul className="pagination-list">
        <button  onClick={() => paginate(currentMountPage-1,1,currentMountPage)}>-</button>
        {mountNumbers.map((number, index) => (
          <li key={index}>
            <a
              onClick={() =>
                collectionState === "mounts"
                  ? paginate(number, 1, index)
                  : paginate(1, number, index)
              }
              href="#"
            >
              {number}
            </a>
          </li>
        ))}
         <button onClick={() => paginate(currentMountPage+1,1,currentMountPage)}>+</button>
      </ul>
    </div>
  );
};
