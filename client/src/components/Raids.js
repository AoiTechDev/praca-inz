import React, { useState } from "react";
import '../styles/raids-styles.css';
import raids_data from '../affixes/raidsImg'
import BackButton from "./small_components/BackButton";
import RaidStats from "./medium_components/RaidStats";

function Raids({data}) {
    const raid_name = data.raids.expansions[7].instances[0].instance.name
    const [raidState, setRaidState] = useState("raids");

    function addRaidState() {
        setRaidState("raid_stats");
      }
      function subRaidState() {
        setRaidState("raids");
      }

    return (
    <div className="raid-container">
        {raidState === 'raid_stats' && <BackButton onClick={subRaidState} />}
        {raidState === 'raids' ? <>
        <div className="raid-title">Raids</div>
        <div 
            className="raid-img"
            style={{
                backgroundImage: `url(${raids_data[0].imgUrl})`
            }}
            onClick={addRaidState}
        >
            <div className="raid-name">{raid_name}</div>
        </div>
        </> : <RaidStats data={data}/> }
        
        
        
    </div> );
}

export default Raids;