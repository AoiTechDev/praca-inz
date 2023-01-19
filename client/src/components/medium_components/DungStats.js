import React from "react";
import '../../styles/dungeons-styles.css';
import affixes_data from "../../affixes/affixes"
function DungStats({data, dungId}) {
    
 
//     <div key={index} className="affix"
//     style={{
//         backgroundImage: affixes_data.map((item) =>
//            console.log(item.name === affix.name)
//         )
//     }}
// >{affix.name}</div>

    const dungStats = data.dungeons.current_period.best_runs[dungId]
    const affixes = dungStats.keystone_affixes.map((affix) =>
        affixes_data.map((item, index)=>
            { return item.name === affix.name && <div
                key={index}
                style={{
                    backgroundImage: `url(affixes/${item.name === affix.name && item.imgUrl})`,

                }}
                className="affix"
            ><div className="affix-tooltip">
                <div className="affix-name">
                    {item.name}
                </div>
                <div className="affix-description">
                    {item.description}
                </div>
            </div>
        </div>}
        )
    
    )
    return (  
        <div className="dung-stats">
            <div className="dung-inside-name">{dungStats.dungeon.name}</div>
            <div className="affixes-container">{affixes}</div>
        </div>

    );
}

export default DungStats;