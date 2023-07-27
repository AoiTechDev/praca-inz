import React from "react";
import PlayerInfo from "./PlayerInfo";
import PlayerMain from "./PlayerMain";
import { useOutletContext } from "react-router-dom";

function Character() {
  const {
    data,
    isFetch,
    handleMouseLeave,
    getSubCategory,
    achivSubCategory,
    responseStatus,
    getPets,
    fetchPetsData,
    petData,
    getAchivsByCategory,
    achivsData,
    mainCharacterData,
    restDataLoading,

    ObjectsNLoaders,
    CollectionState,
    tmpCharacterData,
  } = useOutletContext();

  return (
    Object.keys(mainCharacterData).length > 0 && (
      <div className="player-info">
        <>
          <PlayerInfo mainCharacterData={mainCharacterData} />

          <PlayerMain
            data={data}
            mainCharacterData={mainCharacterData}
            isFetch={isFetch}
            handleMouseLeave={handleMouseLeave}
            getSubCategory={getSubCategory}
            achivSubCategory={achivSubCategory}
            getPets={getPets}
            fetchPetsData={fetchPetsData}
            petData={petData}
            getAchivsByCategory={getAchivsByCategory}
            achivsData={achivsData}
            restDataLoading={restDataLoading}
            ObjectsNLoaders={ObjectsNLoaders}
            CollectionState={CollectionState}
            tmpCharacterData={tmpCharacterData}
          />
        </>
      </div>
    )
  );
}

export default Character;
