import React, { useState } from "react";
import "../styles/talents-styles.css";
import { TalentTooltip } from "./small_components/TalentTooltip";
import MouseTooltip from "react-sticky-mouse-tooltip";

import SmallSlider from "./SmallSlider";

function Talents({ data, restDataLoading}) {
  const spec = data?.talents?.active_specialization?.name;

  const [spellInfo, setSpellInfo] = useState({
    name: "",
    rank: 0,
    cast_time: "",
    cooldown: "",
    description: "",
    power_cost: "",
    range: "",
  });

  const [isHover, setIsHover] = useState(false);

  function toggleEnter() {
    const tooltip = document?.getElementsByClassName("tooltip_container")[0];
    tooltip.style.visibility = "visible";

    setIsHover(true);
  }

  function toggleLeave() {
    const tooltip = document?.getElementsByClassName("tooltip_container")[0];
    tooltip.style.visibility = "hidden";
    setIsHover(false);
  }

  function specTooltip(e) {
    data?.talents?.specializations?.map((idx) => {
      if (idx?.specialization?.name === spec) {
        idx?.loadouts?.map((spec_idx) => {
          if (spec_idx?.is_active) {
            let tmp = spec_idx?.selected_class_talents[e];
            setSpellInfo({
              name: tmp?.tooltip?.talent?.name,
              rank: tmp?.rank,
              cast_time: tmp?.tooltip?.spell_tooltip?.cast_time,
              cooldown: tmp?.tooltip?.spell_tooltip?.cooldown,
              description: tmp?.tooltip?.spell_tooltip?.description,
              power_cost: tmp?.tooltip?.spell_tooltip?.power_cost,
              range: tmp?.tooltip?.spell_tooltip?.range,
            });
          }
        });
      }
    });
  }
  function classTooltip(e) {
    data?.talents?.specializations?.map((idx) => {
      if (idx?.specialization?.name === spec) {
        idx?.loadouts?.map((spec_idx) => {
          if (spec_idx?.is_active) {
            let tmp = spec_idx?.selected_spec_talents[e];
            setSpellInfo({
              name: tmp?.tooltip?.talent?.name,
              rank: tmp?.rank,
              cast_time: tmp?.tooltip?.spell_tooltip?.cast_time,
              cooldown: tmp?.tooltip?.spell_tooltip?.cooldown,
              description: tmp?.tooltip?.spell_tooltip?.description,
              power_cost: tmp?.tooltip?.spell_tooltip?.power_cost,
              range: tmp?.tooltip?.spell_tooltip?.range,
            });
          }
        });
      }
    });
  }

  const class_talents = data?.class_talents_media?.map((spell, index) => (
    <div
      key={index}
      style={{
        backgroundImage: `url(${spell?.assets[0]?.value})`,
      }}
      className="spell_img spec_talents"
      onMouseEnter={() => {
        specTooltip(index), toggleEnter();
      }}
      onMouseLeave={toggleLeave}
    ></div>
  ));

  const spec_talents = data?.spec_talents_media?.map((spell, index) => (
    <div
      key={index}
      style={{
        backgroundImage: `url(${spell?.assets[0]?.value})`,
      }}
      className="spell_img class_talents"
      onMouseEnter={() => {
        classTooltip(index), toggleEnter();
      }}
      onMouseLeave={toggleLeave}
    ></div>
  ));

  return (
    <>
     
      <div className="container" style={{
        minHeight: restDataLoading && '150px'
      }}>
      {restDataLoading && <SmallSlider />}
        <div className="talents_container class_con">
          <div className="classname class">
            <h3>Class Talents</h3>
          </div>
          {class_talents}
        </div>

        <div className="talents_container spec_con">
          <div className="classname spec">
            <h3>Specialization Talents</h3>
          </div>
          {spec_talents}
        </div>

        <MouseTooltip visible={isHover} offsetX={15} offsetY={10}>
          <TalentTooltip spellInfo={spellInfo} />
        </MouseTooltip>
      </div>
    </>
  )
}

export default Talents;
