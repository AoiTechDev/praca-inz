import "../styles/playerMain-styles.css";

import React, { useState } from "react";
import ItemInfo from "./ItemInfo";
import Achievements from "./Achievements";
import Talents from "./Talents";
import Dungeons from "./Dungeons";
import ShrinkPlayerInfo from "./ShrinkPlayerInfo";
import Raids from "./Raids";
import Collection from "./Collection";
import MouseTooltip from "react-sticky-mouse-tooltip";

function PlayerMain({
  data,
  isFetch,
  handleMouseLeave,
  getPets,
  fetchPetsData,
  petData,
}) {
  const [isHover, setIsHover] = useState(false);
  

  function offset(el) {
    var rect = el.getBoundingClientRect();
    return rect;
  }


  function toggleLeave() {
    const tooltip = document.getElementsByClassName("item-info")[0];
    tooltip.style.visibility = "hidden";
    setIsHover(false);
  }

  function toggle(id, key) {
    const item = document.getElementsByClassName("item")[key];
    const quality_color =
      id.quality.name === "Epic"
        ? "rgba(197,15,249,0.56) 0px 0px 40px 25px"
        : id.quality.name === "Legendary"
        ? "rgba(238,119,1, 0.56) 0px 0px 40px 25px"
        : id.quality.name === "Rare"
        ? "rgba(0,128,254, 0.56) 0px 0px 40px 25px"
        : id.quality.name === "Uncommon"
        ? "green 0px 0px 40px 25px"
        : "rgba(0, 0, 0, 0.56) 0px 0px 40px 25px";

    item.style.boxShadow = quality_color;

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

    const tooltip = document.getElementsByClassName("item-info")[0];
    tooltip.style.visibility = "visible";

    setIsHover(true);
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
    sell_price: "",
    set_name: "",
    set_effects: [],
    set_items: [],
  });

  const [achivState, setAchivState] = useState("category");
  const [subAchivs, setSubAchivs] = useState([]);

  function addAchivState() {
    setAchivState("subcategory");
  }
  function subAchivState() {
    setAchivState("category");
  }

  function supAchiv(id) {
    if (data.achiv_categories[id].name !== "Character") {
      setSubAchivs(data.achiv_categories[id].subcategories);
    } else {
      setSubAchivs(data.achiv_categories[id].achievements);
    }
  }

  const achiv = data.achiv_categories.map((item, index) => (
    <div
      key={index}
      className="achiv-category"
      onClick={() => {
        supAchiv(index);
        addAchivState();
      }}
    >
      <div className="achiv_name">{item.name}</div>
    </div>
  ));

  return (
    <div className="player">
      <div
        className="player-img"
        style={{
          backgroundImage: `url(${data.media.assets[3].value})`,
        }}
      ></div>
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
                onMouseEnter={() => {
                  toggle(data.eq.equipped_items[key], key), setIsHover(true);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(key);
                  toggleLeave();
                }}
              >
                {/* <ItemInfo itemInfo={itemInfo} /> */}
              </div>
            );
          })}
      </div>
      <div className="eq-tooltip">
        <MouseTooltip visible={isHover} offsetX={15} offsetY={10}>
          <ItemInfo itemInfo={itemInfo} />
        </MouseTooltip>
      </div>
      {/* <div className="achievements">
    
        {achiv}
       
      </div> */}
      <ShrinkPlayerInfo data={data} />
      <Talents data={data} offset={offset} />
      <Achievements
        achiv={achiv}
        achivState={achivState}
        addAchivState={addAchivState}
        subAchivState={subAchivState}
        subAchivs={subAchivs}
        data={data}
      />
      <Dungeons data={data} />
      <Raids data={data} />

      <Collection
        data={data}
        getPets={getPets}
        fetchPetsData={fetchPetsData}
        petData={petData}
      />
    </div>
  );
}

export default PlayerMain;
