import React from "react";
import class_colors from "../../class_colors/classColors";
import "../../styles/playerInfo-styles.css";
function PlayerInfoName({ mainCharacterData }) {
  const color_class_style = class_colors.find(
    (color) => color?.class === mainCharacterData?.profile?.character_class?.name && color?.color
  );

  return (
    <div className="shrink-player-name">
      <span className='shrink-player-title'>{mainCharacterData?.profile?.active_title?.name}</span>
      <span
        style={{
          color: color_class_style?.color,
        }}
        className="shrink-player-nickname"
      >
        {mainCharacterData?.profile?.name}
      </span>
      <span
        style={{
          color: color_class_style?.color,
        }}
        className="shrink-player-spec"
      >
        {mainCharacterData?.talents?.active_specialization?.name}
      </span>
      <div className="ilvl">level: {mainCharacterData?.profile?.level}</div>
      <div className="ilvl">Item level: {mainCharacterData?.profile?.equipped_item_level}</div>
    </div>
  );
}

export default PlayerInfoName;
