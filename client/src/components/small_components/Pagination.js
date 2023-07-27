import React from "react";

export const Pagination = (props) => {
  const {
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalMounts,
    perPage,
    setCurrentMountPage,
    setCurrentPetPage,
    collectionState,
    totalPets
  } = props;
  const pages = [];

  const total = collectionState === 'mounts' ? totalMounts : totalPets
  for (let i = 1; i <= Math.ceil( total/ perPage); i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    props.onPrevClick();
  };

  const handleNextClick = () => {
    props.onNextClick();
  };

  const handlePageClick = (e) => {
    props.onPageChange(Number(e.target.id));
  };

  const pageNumbers = pages.map((page) => {
    if(collectionState === 'mounts'){
      setCurrentMountPage(currentPage);
    }else{
      setCurrentPetPage(currentPage)
    }
    
    
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li style={{
          cursor: 'pointer'
        }}
          key={page}
          id={page}
          onClick={handlePageClick}
          className={currentPage === page ? "active" : null}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  }

  return (
    <div className="pagination-container">
      {" "}
      <ul className="pagination-list">
        <li>
          <button
            onClick={handlePrevClick}
            disabled={currentPage === pages[0]}
            className="pagination-change-btn"
          >
            Prev
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li>
          <button
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
            className="pagination-change-btn"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};
