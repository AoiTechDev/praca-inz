import "../styles/playerInfo-styles.css";
import React  from "react";

function PlayerInfo({data}) {
    console.log(data)
    return ( 
       <div className="left-nav">
    <div className="player-name">
      <h3>{data.profile.active_title.name}</h3>
      <h1
        style={{
          color:
            data.profile.character_class.name === "Death Knight"
              ? "#C41E3A"
              : data.profile.character_class.name === "Demon Hunter"
              ? "#A330C9"
              : data.profile.character_class.name === "Druid"
              ? "#FF7C0A"
              : data.profile.character_class.name === "Evoker"
              ? "#33937F"
              : data.profile.character_class.name === "Hunter"
              ? "#AAD372"
              : data.profile.character_class.name === "Mage"
              ? "#3FC7EB"
              : data.profile.character_class.name === "Monk"
              ? "#00FF98"
              : data.profile.character_class.name === "Paladin"
              ? "#F48CBA"
              : data.profile.character_class.name === "Priest"
              ? "#FFFFFF"
              : data.profile.character_class.name === "Rouge"
              ? "#FFF468"
              : data.profile.character_class.name === "Shaman"
              ? "#0070DD"
              : data.profile.character_class.name === "Warlock"
              ? "#8788EE"
              : data.profile.character_class.name === "Warrior" &&
                "#C69B6D",
        }}
      >
        {data.profile.name}
      </h1>

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