import React, { useState } from "react";
//import { Pagination } from "../small_components/OldPagination";
import { Pagination } from "../small_components/Pagination";

export const Mounts = ({
  data,
  currentMountPage,
  collectionState,
  setCurrentMountPage,
  perPage
}) => {
  
  const indexOfLastMount = currentMountPage * perPage;
  const indexOfFirstMount = indexOfLastMount - perPage;

  const currentMounts = data.mounts_media.slice(
    indexOfFirstMount,
    indexOfLastMount
  );

  const pageNumberLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const mounts = currentMounts.map((mount, index) => (
    <div className="collection-container" key={index}>
      <div
        style={{
          backgroundImage: `url(${mount.assets[0].value})`,
        }}
        className="collection-img"
      ></div>
      <div className="collection-info">
        {data.mounts.map(
          (item) => item.creature_displays[0].id === mount.id && item.name
        )}
      </div>
    </div>
  ));

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalMounts: data.mounts_media.length,
    perPage,
  };

  return (
    <>
      {/* <Pagination
        mountsPerPage={mountsPerPage}
        totalMounts={data.mounts_media.length}
        paginate={paginate}
        collectionState={collectionState}
        setCurrentMountPage={setCurrentMountPage}
        currentMountPage={currentMountPage}
      /> */}
      <Pagination
        {...paginationAttributes}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        onPageChange={onPageChange}
        setCurrentMountPage={setCurrentMountPage}
        collectionState={collectionState}
      />
      {mounts}
    </>
  );
};
