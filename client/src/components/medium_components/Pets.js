import React, { useState } from "react";
import { Pagination } from "../small_components/Pagination";

export const Pets = ({ data, paginate, currentPetPage }) => {
  const [petsPerPage] = useState(18);
  const indexOfLastPet = currentPetPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;

  const currentPets = data?.pets?.pets?.slice(
    indexOfFirstPet,
    indexOfLastPet
  );

  const pets = currentPets?.map((pet, index) => (
    <div className="collection-container" key={index}>
      <div className="collection-img">asd</div>
      <div className="collection-info"> {pet?.species?.name}</div>
    </div>
  ));
  return (
    <>
      <Pagination
        mountsPerPage={petsPerPage}
        totalMounts={data?.pets?.pets?.length}
        paginate={paginate}
      />
      {pets}
    </>
  );
};
