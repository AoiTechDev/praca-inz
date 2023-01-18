import React from "react";
import '../styles/dungeons-styles.css';

function Dungeons({data}) {
    console.log(data)
    const best_dung_run = data.dungeons.current_period.best_runs.map((dung, index) =>
        <div key={index} className="dungeon">
            {dung.dungeon.name}
        </div>
    )
    return ( 
    <div className="dung_container">
        <div className="dung_title"> Dungeons</div>
        {best_dung_run}
    </div> );
}

export default Dungeons;