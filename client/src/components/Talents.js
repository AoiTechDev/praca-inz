import React, { useState } from "react";
import "../styles/talents-styles.css";

function Talents({ data, offset }) {
  const spec = data.talents.active_specialization.name;
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

  const handleMouseOver = (id, con) => {
    const container = document.getElementsByClassName("container")[0];
    const container_spec = document.getElementsByClassName("spec_con")[0];
    const container_class = document.getElementsByClassName("class_con")[0];

    const tooltip = document.getElementsByClassName("tooltip_container")[0];
    const talent = document.getElementsByClassName("spell_img")[id];

    const spec_rect = container_spec.getBoundingClientRect();
    const class_rect = container_class.getBoundingClientRect();

    const targetRect = talent.getBoundingClientRect();

    if (isHover === false) {
      tooltip.style.visibility = "visible";
      if (window.innerWidth < 1450) {
        if (con === "spec") {
          const top = targetRect.top - spec_rect.top + 430;
          const left = targetRect.left - spec_rect.left;
          tooltip.style.top = `${top + 30}px`;
          if (left > 500) {
            tooltip.style.left = `${left - 130}px`;
          } else {
            tooltip.style.left = `${left}px`;
          }
        } else if (con === "class") {
          const top = targetRect.top - class_rect.top + 220;
          const left = targetRect.left - class_rect.left;
          tooltip.style.top = `${top + 240}px`;
          if (left > 500) {
            tooltip.style.left = `${left - 130}px`;
          } else {
            tooltip.style.left = `${left}px`;
          }
        }
      } else {
        if (con === "spec") {
          const top = targetRect.top - spec_rect.top;
          const left =
            targetRect.left - spec_rect.left + offset(container).left;
          tooltip.style.top = `${top + 60}px`;
          if (left < 40) {
            tooltip.style.left = `${left + 200}px`;
          } else {
            tooltip.style.left = `${left}px`;
          }
        } else if (con === "class") {
          const top = targetRect.top - class_rect.top + 50;
          const left =
            targetRect.left - class_rect.left + offset(container).left;
          tooltip.style.top = `${top + 60}px`;
          tooltip.style.left = `${left + 130}px`;
        }
      }
    }
    setIsHover(true);
  };

  const handleMouseOut = () => {
    const tooltip = document.getElementsByClassName("tooltip_container")[0];
    if (isHover === true) {
      tooltip.style.visibility = "hidden";
    }
    setIsHover(false);
  };

 
  function specTooltip(e) {
    data.talents.specializations.map((idx) => {
      if (idx.specialization.name === spec) {
        idx.loadouts.map((spec_idx) => {
          if (spec_idx.is_active) {
            let tmp = spec_idx.selected_class_talents[e];
            setSpellInfo({
              name: tmp.tooltip.talent.name,
              rank: tmp.rank,
              cast_time: tmp.tooltip.spell_tooltip.cast_time,
              cooldown: tmp.tooltip.spell_tooltip.cooldown,
              description: tmp.tooltip.spell_tooltip.description,
              power_cost: tmp?.tooltip?.spell_tooltip?.power_cost,
              range: tmp?.tooltip?.spell_tooltip?.range,
            });
          }
        });
      }
    });
  }
  function classTooltip(e) {
    data.talents.specializations.map((idx) => {
      if (idx.specialization.name === spec) {
        idx.loadouts.map((spec_idx) => {
          if (spec_idx.is_active) {
            let tmp = spec_idx.selected_spec_talents[e];
            setSpellInfo({
              name: tmp.tooltip.talent.name,
              rank: tmp.rank,
              cast_time: tmp.tooltip.spell_tooltip.cast_time,
              cooldown: tmp.tooltip.spell_tooltip.cooldown,
              description: tmp.tooltip.spell_tooltip.description,
              power_cost: tmp?.tooltip?.spell_tooltip?.power_cost,
              range: tmp?.tooltip?.spell_tooltip?.range,
            });
          }
        });
      }
    });
  }


  const class_talents = data.class_talents_media.map((spell, index) => (
    <div
      key={index}
      style={{
        backgroundImage: `url(${spell.assets[0].value})`,
      }}
      className="spell_img spec_talents"
      onMouseEnter={() => {
        specTooltip(index), handleMouseOver(index, "spec");
      }}
      onMouseLeave={handleMouseOut}
    ></div>
  ));

  const spec_talents = data.spec_talents_media.map((spell, index) => (
    <div
      key={index}
      style={{
        backgroundImage: `url(${spell.assets[0].value})`,
      }}
      className="spell_img class_talents"
      onMouseEnter={() => {
        classTooltip(index), handleMouseOver(index, "class");
      }}
      onMouseLeave={handleMouseOut}
    ></div>
  ));
  return (
    <>
      <div className="container">
        <div className="talents_container class_con">
          <div className="classname class">
            <h2>Class Talents</h2>
          </div>
          {class_talents}
        </div>

        <div className="talents_container spec_con">
          <div className="classname spec">
            <h2>Specialization Talents</h2>
          </div>
          {spec_talents}
        </div>
        <div className="tooltip_container">
          <div className="name">{spellInfo.name}</div>
          <div className="rank">
            Rank: {spellInfo.rank}/{spellInfo.rank}
          </div>

          <div className="cast">
            <div>{spellInfo.cast_time}</div>
            <div>{spellInfo.cooldown}</div>
          </div>
          <div>{spellInfo.range}</div>
          <div> {spellInfo.power_cost}</div>

          <div className="description">{spellInfo.description}</div>
        </div>
      </div>
    </>
  );
}

export default Talents;
