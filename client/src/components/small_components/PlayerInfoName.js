import React  from "react";
import class_colors from "../../class_colors/classColors"
import "../../styles/playerInfo-styles.css";
function PlayerInfoName({data}) {
    
    const color_class_style = class_colors.find((color) => 
      color.class === data.profile.character_class.name && color.color
    )

    return ( 
        <div className="shrink-player-name">
            <h3>{data?.profile.active_title?.name}</h3>
            <h1
                style={{
                color: color_class_style.color
                }}>
                {data?.profile?.name}
            </h1>
            <h2  style={{
                color: color_class_style.color
                }}>{data.talents.active_specialization.name}
            </h2>
            <div className="ilvl"> 
            level: {data.profile.level}
            </div>
            <div className="ilvl">
                Item level: {data.profile.equipped_item_level}
            </div>
        </div>
     );
}

export default PlayerInfoName;