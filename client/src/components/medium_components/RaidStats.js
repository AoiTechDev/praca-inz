import React from "react";
import "../../styles/raids-styles.css";


function RaidStats({data}) {


    const modes = data.raids.expansions[7].instances[0].modes.map((mod, index) =>
        <div key={index} className="mod-container">
            <div className="mod-name">{mod.difficulty.type}</div>
            <div className="progress">
                <div className="progress-proc">
                    {mod.progress.completed_count}/{mod.progress.total_count}    
                </div>   
                <div className="progress-bar"
                    style={{
                        width: `${(mod.progress.completed_count/mod.progress.total_count)*100}%`
                    }}
                ></div>
                <div className="progress-tooltip">
                    {mod.progress.encounters.map((encounter, idx) =>
                        <div key={idx}>{encounter.encounter.name}</div>
                    )}
                </div>
            </div>
        </div>
    )
    return ( 
        <div className="raids-stats-container">
            {modes}
        </div>
     );
}

export default RaidStats;