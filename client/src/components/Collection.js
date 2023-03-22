import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/collection-styles.css";
//import Stack from '@mui/material/Stack';

import { Mounts } from "./medium_components/Mounts";
import { Pets } from "./medium_components/Pets";
import SmallSlider from "./SmallSlider";

function Collection({ data, getPets, fetchPetsData, petData, restDataLoading }) {
  
  const [currentMountPage, setCurrentMountPage] = useState(1);
  const [currentPetPage, setCurrentPetPage] = useState(1);
  const [collectionState, setCollectionState] = useState("mounts");
  const [perPage] = useState(18)
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
 
 
  return (

    <div className="section-container" style={{
      minHeight: restDataLoading && '150px'
    }}>
      {restDataLoading && <SmallSlider/>}
      <div className="section-title">
        <button
          onClick={collectionMountChange}
          className="change-collection-btn"
        >
          Mounts
        </button>
        <button
          onClick={async () => { Object.keys(petData)?.length === 0 && await getPets();collectionPetChange();}}
          className="change-collection-btn"
        >
          Pets
        </button>
      </div>
      {collectionState === "mounts" ? (
        <Mounts
          data={data}
          currentMountPage={currentMountPage}
          collectionState={collectionState}
          setCurrentMountPage={setCurrentMountPage}
          perPage={perPage}
        />
      ) : (
        <Pets
          data={data}
          currentPetPage={currentPetPage}
          collectionState={collectionState}
          petData={petData}
          fetchPetsData={fetchPetsData}
          setCurrentPetPage={setCurrentPetPage}
          perPage={perPage}
        />
       
      )}
    </div>
   
  );
}

export default Collection;
