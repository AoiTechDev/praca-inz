import React, { useState, useEffect } from "react";
import { Pagination } from "../small_components/Pagination";

export const Pets = ({
  data,
  paginate,
  currentPetPage,
  petData,
  fetchPetsData,
}) => {
  console.log(petData);
  const [petsPerPage] = useState(18);
  const indexOfLastPet = currentPetPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const idTable = [];
  const currentPets = petData?.pets?.pets?.slice(
    indexOfFirstPet,
    indexOfLastPet
  );

  const test = petData?.pets_media.slice(indexOfFirstPet, indexOfLastPet);

  // const pets = currentPets?.map((pet, index) => (
  //   <div className="collection-container" key={index}>
  //     {petData.pets_media.map((item, key) => {
  //       if (pet.creature_display !== undefined) {
  //         if (pet.creature_display.id === item.id) {
  //           if(!idTable.includes(item.id)){
  //             idTable.push(item.id)
  //           return (
  //             <div
  //               className="collection-img"
  //               style={{
  //                 backgroundImage: `url(${item.assets[0].value}`,
  //               }}
  //               key={key}
  //             ></div>
  //           );
  //           }

  //         }
  //       }
  //     })}

  //     <div className="collection-info"> {pet?.species?.name}</div>
  //   </div>
  // ));

  const pets = test?.map((pet, index) => (
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

  return (
    <>
      {fetchPetsData && (
        <>
          <Pagination
            mountsPerPage={petsPerPage}
            totalMounts={petData?.pets?.pets?.length}
            paginate={paginate}
          />
          {pets}
        </>
      )}
    </>
  );
};
