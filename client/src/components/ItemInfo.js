import '../styles/playerInfo-styles.css'
import React from 'react'

function ItemInfo({itemInfo}) {
    
    return (
       <div className="item-info">
    <h3
      style={{
        color:
          itemInfo?.quality === "Epic"
            ? "rgb(197,15,249)"
            : itemInfo?.quality === "Legendary"
            ? "rgb(238,119,1)"
            : itemInfo?.quality === "Rare"
            ? "rgb(0,128,254)"
            : itemInfo?.quality === "Uncommon"
            ? "green"
            : "grey",
      }}
    >
      {itemInfo?.name}
    </h3>
    <p
      style={{
        color: "rgb(223,182,2)",
      }}
    >
      Item level: {itemInfo?.ilvl}
    </p>
    <p>{itemInfo?.boe}</p>
    <div className="type">
      <div> {itemInfo?.type}</div>
      <div>{itemInfo?.arrmor_type}</div>
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
          +{stat?.value} {stat?.type?.name}
        </p>
      ))}

    <p
      style={{
        color: itemInfo?.spell !== "" ? "lime" : "white",
      }}
    >
      {itemInfo?.spell}
    </p>

    <div className="set_name"> {itemInfo?.set_name}</div>
    <div className="set_items">
      {itemInfo?.set_items?.map((item, index) =>(
        <div key={index} className="set_items_names"
          style={{
            color: 
            item?.is_equipped ? "rgb(245, 222, 15)"
            : "rgb(77, 77, 76)"
          }}
        >{item?.item?.name}</div>
      )
      )}

    </div>


    <div className="set_effects">
      {itemInfo?.set_effects?.map((effect, key) =>
        <div key={key}
          style={{
            color: effect?.is_active ? "lime"
            : "rgb(77, 77, 76)"
          }}
        >{effect?.display_string}</div>
      )}

    </div>

    <div className="durability">{itemInfo?.durability}</div>

    {itemInfo?.sell_price && <div className="sell_price">
      <div>{itemInfo?.sell_price?.header}  </div> 
      <div className="gold">{itemInfo?.sell_price?.gold}<span>g</span> </div>
      <div className="silver"> {itemInfo?.sell_price?.silver}<span>s</span> </div>
      <div className="copper">{itemInfo?.sell_price?.copper}<span>c</span>  </div>
    </div>}
    
  </div> );
}

export default ItemInfo;