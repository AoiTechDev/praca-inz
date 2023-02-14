import React from "react";

export const SubmitButton = ({ state, getFun, Link, isFetch }) => {
  return (
    <Link to="guild" className={isFetch ? 'nav-submit-btn-container' : "submit-btn-container"}>
      <button className={isFetch ? 'nav-submit-btn' : "submit-btn"} onClick={getFun}>
        {" "}
        Find {state}
      </button>{" "}
    </Link>
  );
};
