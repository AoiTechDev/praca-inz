import React  from "react";
import "../styles/playerInfo-styles.css";
import ShrinkPlayerStats from "./small_components/ShrinkPlayerStats";
import PlayerInfoName from "./small_components/PlayerInfoName";

function ShrinkPlayerInfo({data}) {
   
    return ( 
        <div className="shrink-player-info">
            <div className="shrink-player-name-container shrink-container">
                <PlayerInfoName data={data}/>
            </div>
            <div className="shrink-player-stats shrink-container">
                <ShrinkPlayerStats data={data}/>
            </div>
        </div>
     );
}

export default ShrinkPlayerInfo;