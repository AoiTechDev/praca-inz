import React, { useState, useEffect } from "react";
//import { Pagination } from "../small_components/OldPagination";
import { Pagination } from "../small_components/Pagination";
export const Pets = ({
  data,
  paginate,
  currentPetPage,
  petData,
  fetchPetsData,
  setCurrentPetPage,
  collectionState,
  perPage
}) => {
  console.log(petData);
 
  const indexOfLastPet = currentPetPage * perPage;
  const indexOfFirstPet = indexOfLastPet - perPage;
  const idTable = [];
  
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


  
  const currentPets = petData?.pets_media.slice(indexOfFirstPet, indexOfLastPet);

  const pets = currentPets?.map((pet, index) => (
    <div className="collection-container" key={index}>
      <div
        className="collection-img"
        style={{
          backgroundImage: `url(${pet.assets[0].value}`,
        }}
      ></div>
      <div className="collection-info">
        {petData.pets.pets.map((item) => {
          if (item.creature_display !== undefined) {
            if (item.creature_display.id === pet.id) {
              if (!idTable.includes(pet.id)) {
                idTable.push(pet.id);
                return item.species.name
              }
            }
          }
        })}
      </div>
    </div>
  ));

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalPets: petData.pets_media.length,
    perPage
  };

  return (
    <>
      {fetchPetsData && (
        <>
         <Pagination
        {...paginationAttributes}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        onPageChange={onPageChange}
        setCurrentPetPage={setCurrentPetPage}
        collectionState={collectionState}
      />
          {pets}
        </>
      )}
    </>
  );
};
