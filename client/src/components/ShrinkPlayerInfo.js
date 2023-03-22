import React  from "react";
import "../styles/playerInfo-styles.css";
import ShrinkPlayerStats from "./small_components/ShrinkPlayerStats";
import PlayerInfoName from "./small_components/PlayerInfoName";

function ShrinkPlayerInfo({mainCharacterData}) {
   
    return ( 
        <div className="shrink-player-info">
            <div className="shrink-player-name-container shrink-container">
                <PlayerInfoName mainCharacterData={mainCharacterData}/>
            </div>
            <div className="shrink-player-stats shrink-container">
                <ShrinkPlayerStats mainCharacterData={mainCharacterData}/>
            </div>
        </div>
     );
}

export default ShrinkPlayerInfo;