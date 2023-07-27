import React, { useState, useEffect } from "react";

import "../styles/guild-styles.css";
import { json, useOutletContext } from "react-router-dom";
import class_colors from "../class_colors/classColors";
import { ClassChart } from "./medium_components/ClassChart";
import { GuildHeader } from "./small_components/Guild/GuildHeader";
import { GuildRoster } from "./small_components/Guild/GuildRoster";
import { SpecChart } from "./small_components/SpecChart";
import _ from "lodash";

function Guild() {
  const { guildData, guildFetch, getGuildMember } = useOutletContext();
  const [memberClickState, setMemberClickState] = useState(9999);
  const [memberClick, setMemberClick] = useState(false);
  const [charClassName, setCharClassName] = useState("");
  const specCounts = {};

  const [specCountsArr, setSpecCountsArr] = useState([]);
  const allSpeces = [];
  let test = [];
  let cnt = 0;

  useEffect(() => {
    guildData?.roster_profile?.map(
      (spec) =>
        spec?.character_class?.name === charClassName &&
        allSpeces.push(spec?.active_spec?.name)
    );

    allSpeces.forEach(function (x) {
      return (specCounts[x] = (specCounts[x] || 0) + 1);
    });

    Object.keys(specCounts).map((key, index) => {
      test.push({ name: key, value: specCounts[key] });
    });
    setSpecCountsArr(test);
  }, [charClassName]);

  const guildMembers = guildData?.roster_profile?.map((member, index) => {
    const color_class_style = class_colors?.find(
      (color) => color?.class === member?.character_class?.name
    );

    return (
      <div
        className="guild-members"
        key={index}
        onClick={() => guildMemberToggle(index)}
      >
        <div className="member-name">{member?.name}</div>
        <div>{member?.level}</div>
        <div>{member?.equipped_item_level}</div>
        <div>{guildData?.roster?.members[index]?.rank}</div>
        <div className="member-more-stats">
          <div
            className="member-class"
            style={{
              color: color_class_style?.color,
            }}
          >
            {member?.character_class?.name}
          </div>
          <div className="member-spec">{member?.active_spec?.name}</div>
          <div className="member-race">{member?.race?.name}</div>
        </div>
      </div>
    );
  });

  function guildMemberToggle(id) {
    const members = document.getElementsByClassName("guild-members");
    const member = document.getElementsByClassName("guild-members")[id];
    const members_stats = document.querySelectorAll(
      ".guild-members .member-more-stats"
    );
    const member_stats = document.querySelectorAll(
      ".guild-members .member-more-stats"
    )[id];

    for (let i = 0; i < members.length; i++) {
      members[i].classList.remove("active-member");
      members_stats[i].style.visibility = "hidden";
    }

    if (memberClickState === id) {
      if (memberClick) {
        member_stats.style.visibility = "visible";
        member.classList.add("active-member");
        setMemberClick(false);
      } else {
        members_stats[memberClickState].style.visibility = "hidden";
        members[memberClickState].classList.remove("active-member");
        setMemberClick(true);
      }
    } else {
      member_stats.style.visibility = "visible";
      member.classList.add("active-member");
      setMemberClick(false);
    }
    setMemberClickState(id);
  }
  return (
    <div className="main-guild-container">
      {guildFetch && (
        <div className="guild-container">
          <GuildHeader guildData={guildData} />
          <GuildRoster guildMembers={guildMembers} />

          <div className="guild-stats-container container-style">
            <div className="guild-stats">
              <span className="guild-statistics-title">
                Classes and Specializations Statistics
              </span>
            </div>
            <div className="guild-class-chart">
              <ClassChart
                guildData={guildData}
                setCharClassName={setCharClassName}
              />
            </div>
            <div className="guild-spec-chart ">
              <SpecChart
                specCountsArr={specCountsArr}
                charClassName={charClassName}
                class_colors={class_colors}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Guild;
