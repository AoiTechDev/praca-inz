import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/collection-styles.css";
//import Pagination from '@mui/material/Pagination';
//import Stack from '@mui/material/Stack';

import { Mounts } from "./medium_components/Mounts";
import { Pets } from "./medium_components/Pets";

function Collection({ data, getPets, fetchPetsData, petData }) {
  //console.log(data);
  const [currentMountPage, setCurrentMountPage] = useState(1);
  const [currentPetPage, setCurrentPetPage] = useState(1);
  const [collectionState, setCollectionState] = useState("mounts");

  function collectionMountChange() {
    if (collectionState === "pets") {
      setCollectionState("mounts");
    }
    setCurrentMountPage(1);
    
  }
  function collectionPetChange() {
    if (collectionState === "mounts") {
      setCollectionState("pets");
    }
    setCurrentPetPage(1);
    
  }

  useEffect(() => {
    const a = document
      .getElementsByClassName("pagination-list")[0]
      .getElementsByTagName("a");
    a[0].classList.add("active");
  }, [collectionState]);

  const paginate = (mountPageNumber, petPageNumber, id) => {
    setCurrentMountPage(mountPageNumber);
    setCurrentPetPage(petPageNumber);

    const a = document
      .getElementsByClassName("pagination-list")[0]
      .getElementsByTagName("a");

    console.log(a[id]);
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
    }
    a[id].classList.add("active");
  };
  
  //console.log(paginationClickState)
  return (
    <div className="section-container">
      <div className="section-title">
        <button
          onClick={collectionMountChange}
          className="change-collection-btn"
        >
          Mounts
        </button>
        <button
          onClick={async () => { await getPets();collectionPetChange();}}
          className="change-collection-btn"
        >
          Pets
        </button>
      </div>
      {collectionState === "mounts" ? (
        <Mounts
          data={data}
          paginate={paginate}
          currentMountPage={currentMountPage}
          collectionState={collectionState}
        />
      ) : (
        <Pets
          data={data}
          paginate={paginate}
          currentPetPage={currentPetPage}
          collectionState={collectionState}
          petData={petData}
          fetchPetsData={fetchPetsData}
        />
      )}
    </div>
  );
}

export default Collection;
