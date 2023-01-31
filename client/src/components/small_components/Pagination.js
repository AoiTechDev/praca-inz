import React from "react";

export const Pagination = ({
  mountsPerPage,
  totalMounts,
  paginate,
  collectionState,
}) => {
  const mountNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMounts / mountsPerPage); i++) {
    mountNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="pagination-list">
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
      </ul>
    </div>
  );
};
