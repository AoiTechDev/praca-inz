import '../styles/playerInfo-styles.css'
import React from 'react'

function ItemInfo({itemInfo}) {
    return ( <div className="item-info">
    <h3
      style={{
        color:
          itemInfo.quality === "Epic"
            ? "rgb(197,15,249)"
            : itemInfo.quality === "Legendary"
            ? "rgb(238,119,1)"
            : itemInfo.quality === "Rare"
            ? "rgb(0,128,254)"
            : "grey",
      }}
    >
      {itemInfo.name}
    </h3>
    <p
      style={{
        color: "rgb(223,182,2)",
      }}
    >
      Item level: {itemInfo.ilvl}
    </p>
    <p>{itemInfo.boe}</p>
    <div className="type">
      <div> {itemInfo.type}</div>
      <div>{itemInfo.arrmor_type}</div>
    </div>
    <div className="type">
      <div> {itemInfo?.weapon_dmg}</div>
      <div>{itemInfo?.attack_speed}</div>
    </div>
    <p>{itemInfo?.dps}</p>
    <p>{itemInfo?.armor}</p>
    {itemInfo?.stats?.length > 0 &&
      itemInfo?.stats.map((stat, key) => (
        <p
          style={{
            color: stat?.is_negated
              ? "grey"
              : stat?.is_equip_bonus && "lime",
          }}
          key={key}
        >
          +{stat.value} {stat.type.name}
        </p>
      ))}

    <p
      style={{
        color: itemInfo.spell !== "" ? "lime" : "white",
      }}
    >
      {itemInfo?.spell}
    </p>
    <div className="durability">{itemInfo.durability}</div>
  </div> );
}

export default ItemInfo;