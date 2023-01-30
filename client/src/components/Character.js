import React from "react";
import PlayerInfo from "./PlayerInfo";
import PlayerMain from "./PlayerMain";
import { useOutletContext } from "react-router-dom";

function Character() {
    const {data, isFetch, handleMouseLeave, getSubCategory, achivSubCategory, responseStatus} = useOutletContext();
    
    return (  
        <div className="player-info">

          {responseStatus === 200 ? <>
            <PlayerInfo data={data} />

            <PlayerMain
              data={data}
              isFetch={isFetch}
              handleMouseLeave={handleMouseLeave}
              getSubCategory={getSubCategory}
              achivSubCategory={achivSubCategory}
            />
          </> : ''}
                
              </div>
    );
}

export default Character;