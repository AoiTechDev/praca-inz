import React from "react";
import PlayerInfo from "./PlayerInfo";
import PlayerMain from "./PlayerMain";
import { useOutletContext } from "react-router-dom";

function Character() {
    const {data, isFetch, handleMouseLeave} = useOutletContext();
    
    return (  
        <div className="player-info">
                <PlayerInfo data={data} />

                <PlayerMain
                  data={data}
                  isFetch={isFetch}
                  handleMouseLeave={handleMouseLeave}
                />
              </div>
    );
}

export default Character;