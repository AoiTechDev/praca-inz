import "../styles/playerInfo-styles.css";
import React from "react";
import class_colors from "../class_colors/classColors";
function PlayerInfo({ mainCharacterData }) {
  const color_class_style = class_colors.find(
    (color) => color?.class === mainCharacterData?.profile?.character_class?.name
  );

  return (
    <div className="left-nav">
      <div className="player-name-left">
        <span>{mainCharacterData?.profile?.active_title?.name}</span>

        <span
          style={{
            color: color_class_style?.color,
          }}
          className="player-nickname"
        >
          {mainCharacterData?.profile?.name}
        </span>
        <span
          style={{
            color: color_class_style?.color,
          }}
        >
          {mainCharacterData?.talents?.active_specialization?.name}
        </span>
        <div className="ilvl"> level: {mainCharacterData?.profile?.level}</div>
        <div className="ilvl">
          Item level: {mainCharacterData?.profile?.equipped_item_level}
        </div>
      </div>
      <div className="stats stats-left">
        <span className="stats-text">Health: </span>
        <span>{mainCharacterData?.stats?.health}</span>
        <br />
        <span className="stats-text">{mainCharacterData?.stats?.power_type?.name}:</span>
        <span> {mainCharacterData?.stats?.power}</span>
        <hr />
        <p className="stats-text">Stamina: {mainCharacterData?.stats?.stamina?.base}</p>
        <p className="stats-text">Strength: {mainCharacterData?.stats?.strength?.base}</p>
        <p className="stats-text">Intellect: {mainCharacterData?.stats?.intellect?.base}</p>
        <p className="stats-text">Agility: {mainCharacterData?.stats?.agility?.base}</p>
        <hr />
        <p className="stats-text">Mastery: {mainCharacterData?.stats?.mastery?.rating}</p>
        <p className="stats-text">Haste: {mainCharacterData?.stats?.spell_haste?.rating}</p>
        <p className="stats-text">Versatility: {mainCharacterData?.stats?.versatility} </p>
        <p className="stats-text">
          Critical Strike: {mainCharacterData?.stats?.spell_crit?.rating}
        </p>
        <hr />
        <div className="minor-stats">
          <span>
            Show Minor attributes
            <div className="minor-stats-tooltip">
              <p>Avoidance: {mainCharacterData?.stats?.avoidance?.rating_bonus}</p>
              <p>Block: {mainCharacterData?.stats?.block?.value}</p>
              <p>Dodge: {mainCharacterData?.stats?.dodge?.value}</p>
              <p>Parry: {mainCharacterData?.stats?.parry?.value}</p>
              <p>Lifesteal: {mainCharacterData?.stats?.lifesteal?.value}</p>
              <p>Speed: {mainCharacterData?.stats?.speed?.rating}</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlayerInfo;
