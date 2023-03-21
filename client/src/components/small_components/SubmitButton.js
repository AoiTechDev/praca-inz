import React from "react";

export const SubmitButton = ({ state, getFun, Link, isFetch, searchState }) => {
  
  return (
    <Link to={state === 'Guild' ? 'guild' : '/'} className={isFetch ? 'nav-submit-btn-container' : "submit-btn-container"}>
      <button className={isFetch ? 'nav-submit-btn' : "submit-btn"} onClick={getFun}>
        {" "}
        Find {state}
      </button>{" "}
    </Link>
  );
};
