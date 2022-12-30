import "../styles/playerMain-styles.css";

import React, { useState, useEffect } from "react";
import ItemInfo from "./ItemInfo";
import Achievements from "./Achievements";


function PlayerMain({ data, isFetch, handleMouseLeave, achivSubCategory, getSubCategory }) {
  function toggle(id, key) {
    const item = document.getElementsByClassName("item")[key];
    (item.style.boxShadow =
      id.quality.name === "Epic"
        ? "rgba(197,15,249,0.56) 0px 0px 40px 25px"
        : id.quality.name === "Legendary"
        ? "rgba(238,119,1, 0.56) 0px 0px 40px 25px"
        : id.quality.name === "Rare"
        ? "rgba(0,128,254, 0.56) 0px 0px 40px 25px"
        : "rgba(0, 0, 0, 0.56) 0px 0px 40px 25px"),
      setItemInfo({
        name: id.name,
        type: id.inventory_type.name,
        ilvl: id.level.value,
        stats: id.stats,
        boe: id.binding.name,
        quality: id.quality.name,
        arrmor_type: id.item_subclass.name,
        durability: id.durability?.display_string,
        weapon_dmg: id?.weapon?.damage?.display_string,
        spell: id?.spells === undefined ? "" : id?.spells[0]?.description,
        armor: id?.armor?.display?.display_string,
        attack_speed: id?.weapon?.attack_speed?.display_string,
        dps: id?.weapon?.dps?.display_string,
      });
  }

  const [itemInfo, setItemInfo] = useState({
    name: "",
    type: "",
    ilvl: "",
    stats: [],
    boe: "",
    quality: "",
    arrmor_type: "",
    durability: "",
    weapon_dmg: "",
    spell: "",
    armor: "",
    attack_speed: "",
    dps: "",
  });

  const [achivState, setAchivState] = useState(0)
  //const [achivSub, setAchivSub] = useState({})
  const [achivs, setAchivs] = useState(data.achiv_data.root_categories)


  function addAchivState(){
    setAchivState(prev => prev >= 2 ? prev = 2 : prev + 1)
  }
  function subAchivState(){
    setAchivState(prev => prev - 1)
  }

  
  useEffect(() => {
    //setAchivSub(achivSubCategory.achievements)
    setAchivs(achivSubCategory.achievements)
  },[achivState]);


  // const achiv = data.achiv_data.root_categories.map((item, index) => 
  //   <div key={index} className="achiv-category"  onClick={() => {getSubCategory(item); addAchivState()}}>
  //     <p>{item.name}</p>
  //     </div>
  // )

  const achiv = data.achiv_data.root_categories.map((item, index) => 
  <div key={index} className="achiv-category"  onClick={() => {getSubCategory(item); addAchivState()}}>
    <p>{item.name}</p>
    </div>
  
    )
  
  console.log(achivs)
 
  return (
    <div className="player">
      <div
        className="player-img"
        style={{
          backgroundImage: `url(${data.media.assets[3].value})`,
        }}
      >
        <div className="eq">
          {isFetch &&
            data?.media_eq?.map((item, key) => {
              return (
                <div
                  className="item"
                  key={key}
                  style={{
                    backgroundImage: `url(${item.assets[0].value})`,
                  }}
                  onMouseEnter={() => toggle(data.eq.equipped_items[key], key)}
                  onMouseLeave={() => handleMouseLeave(key)}
                >
                  <ItemInfo itemInfo={itemInfo} />
                </div>
              );
            })}
        </div>
      </div>
      {/* <div className="achievements">
    
        {achiv}
       
      </div> */}

      <Achievements 
       achiv={achiv}
       achivState={achivState}
       addAchivState={addAchivState}
       subAchivState={subAchivState}
       achivSubCategory={achivSubCategory} 
       />
    </div>
  );
}

export default PlayerMain;
