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
    restDataLoading
  } = useOutletContext();

  return (
    <div className="player-info">
      {responseStatus === 200 ? (
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
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Character;
