import "../styles/playerInfo-styles.css";
import React  from "react";
import class_colors from "../class_colors/classColors"
function PlayerInfo({data}) {


    const color_class_style = class_colors.find((color) => 
      color.class === data.profile.character_class.name && color.color
    )
    
    return ( 
       <div className="left-nav">
    <div className="player-name-left">
      <h3>{data?.profile.active_title?.name}</h3>
      
      <h1
        style={{
          color: color_class_style
        }}
      >
        {data?.profile?.name}
      </h1>
        <h2  style={{
          color: color_class_style
        }}>{data.talents.active_specialization.name}</h2>
      <div className="ilvl"> level: {data.profile.level}</div>
      <div className="ilvl">
        Item level: {data.profile.equipped_item_level}
      </div>
    </div>
    <div className="stats stats-left">
      <span className="stats-text">Health: </span>
      <span>{data.stats.health}</span>
      <br />
      <span className="stats-text">
        {data.stats.power_type.name}:
      </span>
      <span> {data.stats.power}</span>
      <hr />
      <p className="stats-text">Stamina: {data.stats.stamina.base}</p>
      <p className="stats-text">
        Strength: {data.stats.strength.base}
      </p>
      <p className="stats-text">
        Intellect: {data.stats.intellect.base}
      </p>
      <p className="stats-text">Agility: {data.stats.agility.base}</p>
      <hr />
      <p className="stats-text">
        Mastery: {data.stats.mastery.rating}
      </p>
      <p className="stats-text">
        Haste: {data.stats.spell_haste.rating}
      </p>
      <p className="stats-text">
        Versatility: {data.stats.versatility}{" "}
      </p>
      <p className="stats-text">
        Critical Strike: {data.stats.spell_crit.rating}
      </p>
      <hr/>
      <div className="minor-stats">
        <span>Show Minor attributes

          <div className="minor-stats-tooltip">
            <p>Avoidance: {data.stats.avoidance.rating_bonus}</p>
            <p>Block: {data.stats.block.value}</p>
            <p>Dodge: {data.stats.dodge.value}</p>
            <p>Parry: {data.stats.parry.value}</p>
            <p>Lifesteal: {data.stats.lifesteal.value}</p>
            <p>Speed: {data.stats.speed.rating}</p>
          </div>
        </span>
      </div>
    </div>
  </div>);
}

export default PlayerInfo;