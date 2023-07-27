import React from "react";

export const EmptyInputsError = ({ isCharacterEmpty, isGuildEmpty, state }) => {
  
  return state === "Player"
    ? isCharacterEmpty && (
        <div className="player-not-found"> Please place data</div>
      )
    : isGuildEmpty && (
        <div className="player-not-found"> Please place data</div>
      );
};
