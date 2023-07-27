import React from "react";

export const NotFoundError = ({
  tmpCharacterData,
  tmpGuildData,
  state,
}) => {
  
  return state === "Player"
    ? tmpCharacterData?.status === 404 && (
        <div className="player-not-found"> Character not found</div>
      )
    : tmpGuildData?.status === 404 && (
        <div className="player-not-found"> Guild not found</div>
      );
};
