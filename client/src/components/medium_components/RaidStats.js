import React from "react";
import "../../styles/raids-styles.css";
function RaidStats({data}) {
    const modes = data.raids.expansions[7].instances[0].modes.map((mod, index) =>
        <div key={index}>
            <div className="mod-name">{mod.difficulty.name}</div>
        </div>
    )
    return ( 
        <div className="raids-stats-container">
            {modes}
        </div>
     );
}

export default RaidStats;