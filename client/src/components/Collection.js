import React, { useState, useEffect } from "react";

import "../styles/collection-styles.css";

import { Mounts } from "./medium_components/Mounts";
import { Pets } from "./medium_components/Pets";
import SmallSlider from "./SmallSlider";

function Collection({
  data,
  getPets,
  fetchPetsData,
  petData,
  restDataLoading,
  ObjectsNLoaders,
  CollectionState,
}) {
  const [currentMountPage, setCurrentMountPage] = useState(1);
  const [currentPetPage, setCurrentPetPage] = useState(1);

  const [perPage] = useState(18);
  function collectionMountChange() {
    if (CollectionState.collectionState === "pets") {
      CollectionState.collectionSet("mounts");
    }
    setCurrentMountPage(1);
  }
  function collectionPetChange() {
    if (CollectionState.collectionState === "mounts") {
      CollectionState.collectionSet("pets");
    }
    setCurrentPetPage(1);
  }

  return (
    <div
      className="section-container"
      style={{
        minHeight: ObjectsNLoaders.mounts.mountsLoader && "150px",
      }}
    >
      {ObjectsNLoaders.mounts.mountsLoader && <SmallSlider />}
      {ObjectsNLoaders.pets.petLoader && <SmallSlider />}
      <div className="section-title">
        <button
          onClick={collectionMountChange}
          className="change-collection-btn"
        >
          Mounts
        </button>
        <button
          onClick={async () => {
            Object.keys(petData)?.length === 0 && (await getPets());
            collectionPetChange();
          }}
          className="change-collection-btn"
        >
          Pets
        </button>
      </div>
      {CollectionState.collectionState === "mounts" ? (
        <Mounts
          data={ObjectsNLoaders.mounts.mountsData}
          currentMountPage={currentMountPage}
          collectionState={CollectionState.collectionState}
          setCurrentMountPage={setCurrentMountPage}
          perPage={perPage}
        />
      ) : (
        <Pets
          data={data}
          currentPetPage={currentPetPage}
          collectionState={CollectionState.collectionState}
          petData={petData}
          fetchPetsData={fetchPetsData}
          setCurrentPetPage={setCurrentPetPage}
          perPage={perPage}
          ObjectsNLoaders={ObjectsNLoaders}
        />
      )}
    </div>
  );
}

export default Collection;
