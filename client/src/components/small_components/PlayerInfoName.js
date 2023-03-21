import React from "react";
import class_colors from "../../class_colors/classColors";
import "../../styles/playerInfo-styles.css";
function PlayerInfoName({ data }) {
  const color_class_style = class_colors.find(
    (color) => color.class === data.profile.character_class.name && color.color
  );

  return (
    <div className="shrink-player-name">
      <span className='shrink-player-title'>{data?.profile.active_title?.name}</span>
      <span
        style={{
          color: color_class_style.color,
        }}
        className="shrink-player-nickname"
      >
        {data?.profile?.name}
      </span>
      <span
        style={{
          color: color_class_style.color,
        }}
        className="shrink-player-spec"
      >
        {data.talents.active_specialization.name}
      </span>
      <div className="ilvl">level: {data.profile.level}</div>
      <div className="ilvl">Item level: {data.profile.equipped_item_level}</div>
    </div>
  );
}

export default PlayerInfoName;
