import "../styles/playerMain-styles.css";

import React, { useState } from "react";
import ItemInfo from "./ItemInfo";
import Achievements from "./Achievements";
import Talents from "./Talents";
import Dungeons from "./Dungeons";


function PlayerMain({ data, isFetch, handleMouseLeave }) {

const handleMouseOut = () => {
  const tooltip = document.getElementsByClassName("item-info")[0]
  tooltip.style.visibility = "hidden"
};

function offset(el) {
  var rect = el.getBoundingClientRect();
  return rect;
}

  function toggle(id, key) {  


    const item = document.getElementsByClassName("item")[key];
    const quality_color = id.quality.name === "Epic"
    ? "rgba(197,15,249,0.56) 0px 0px 40px 25px"
    : id.quality.name === "Legendary"
    ? "rgba(238,119,1, 0.56) 0px 0px 40px 25px"
    : id.quality.name === "Rare"
    ? "rgba(0,128,254, 0.56) 0px 0px 40px 25px"
    : id.quality.name === "Uncommon"
    ? "green 0px 0px 40px 25px"
    : "rgba(0, 0, 0, 0.56) 0px 0px 40px 25px"

    item.style.boxShadow =quality_color
        
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
        sell_price: id?.sell_price?.display_strings,
        set_name: id?.set?.display_string,
        set_effects: id?.set?.effects,
        set_items: id?.set?.items,
      });

      const tooltip = document.getElementsByClassName("item-info")[0]
      tooltip.style.visibility = "visible"
      const player = document.getElementsByClassName("player")[0]
      // console.log(offset(player))
      // console.log(offset(item))

    
     
      let test = 0
      let item_top = offset(item).top - 80
      if(key === 0 || key % 2 === 0){
        test = offset(item).left - offset(player).left + 100
      }else {
        test = offset(item).left - window.innerWidth/3 - 150
        window.innerWidth < 1400 
      

       if(window.innerWidth > 1000 & window.innerWidth < 1400){
        test = offset(item).left - window.innerWidth/3 - 250
       }
       if(window.innerWidth < 1000 ){
        test = offset(item).left - window.innerWidth/3 - 300
       }
      }
      console.log(window.innerWidth)
      tooltip.style.left = `${test}px`
      tooltip.style.top = `${item_top}px`
      
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
    sell_price:"",
    set_name: "",
    set_effects: [],
    set_items: [],
  });

  const [achivState, setAchivState] = useState(0)
  //const [achivSub, setAchivSub] = useState({})
  const [subAchivs, setSubAchivs] = useState([])

  function addAchivState(){
    setAchivState(prev => prev >= 2 ? prev = 2 : prev + 1)
  }
  function subAchivState(){
    setAchivState(prev => prev - 1)
  }

  function supAchiv(id){
    if(data.achiv_categories[id].name !== "Character"){
      setSubAchivs(data.achiv_categories[id].subcategories)
    }else{
      setSubAchivs(data.achiv_categories[id].achievements)

    }
  }

  const achiv = data.achiv_categories.map((item, index) => 
  <div key={index} className="achiv-category" onClick={() => {supAchiv(index); addAchivState();}}>
    <div className="achiv_name">{item.name}</div>
    </div>
    )
  

 
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
                  onMouseLeave={() => {handleMouseLeave(key); handleMouseOut();}}
                  >
                 {/* <ItemInfo itemInfo={itemInfo} /> */}
                </div>
              );
            })}
        </div>
        <div className="test" >
          <ItemInfo itemInfo={itemInfo} />
        </div>
      </div>
      {/* <div className="achievements">
    
        {achiv}
       
      </div> */}
      <Talents data={data}/>
      <Achievements 
       achiv={achiv}
       achivState={achivState}
       addAchivState={addAchivState}
       subAchivState={subAchivState}
       subAchivs={subAchivs}
       data={data}
       />
       <Dungeons data={data}/>
    </div>
  );
}

export default PlayerMain;
