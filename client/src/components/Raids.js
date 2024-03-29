import React, { useState } from "react";
import "../styles/raids-styles.css";
import raids_data from "../affixes/raidsImg";
import BackButton from "./small_components/BackButton";
import RaidStats from "./medium_components/RaidStats";
import SmallSlider from "./SmallSlider";

function Raids({ObjectsNLoaders}) {
  const [raidState, setRaidState] = useState("raids");
  const [raidId, setRaidId] = useState(0);
  const raid_container = document.getElementsByClassName('raid-container')[0];

  function addRaidState(id) {
    setRaidId(id);
    
    raid_container.style.gridTemplateColumns = 'none'
    setRaidState("raid_stats");
  }
  function subRaidState() {
    raid_container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))'
    setRaidState("raids");
  }

  const expansions = ObjectsNLoaders.raids.raidsData?.raids?.expansions.map((xpac, index) => {
    return raids_data.map((rdata) => {
      return (
        xpac?.expansion?.name === rdata?.name && (
          <div
            key={index}
            style={{
              backgroundImage: `url(${rdata?.imgUrl})`,
            }}
            className="raid-img"
            onClick={() => addRaidState(index)}
          >
            {" "}
            <div className="raid-name">{xpac?.expansion?.name}</div>
          </div>
        )
      );
    });
  });

  


  return (
    <div className="raid-container" style={{
      minHeight: ObjectsNLoaders.raids.raidsLoader && '150px'
    }}>
      {ObjectsNLoaders.raids.raidsLoader && <SmallSlider/>}
      {raidState === "raid_stats" && <BackButton onClick={subRaidState} />}
      {raidState === "raids" && <div className="raid-title">Raids</div>}
      {raidState === "raids" ? expansions : <RaidStats data={ObjectsNLoaders.raids.raidsData} raidId={raidId}/>}
    </div>
  );
}

export default Raids;
