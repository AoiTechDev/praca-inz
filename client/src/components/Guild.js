import React, { useState } from "react";

import "../styles/guild-styles.css";
import { useOutletContext } from "react-router-dom";
import class_colors from "../class_colors/classColors";
import { ClassChart } from "./medium_components/ClassChart";
import { GuildHeader } from "./small_components/Guild/GuildHeader";
import { GuildRoster } from "./small_components/Guild/GuildRoster";
function Guild() {
  const { guildData, guildFetch, getGuildMember } = useOutletContext();
  const [memberClickState, setMemberClickState] = useState(9999);
  const [memberClick, setMemberClick] = useState(false);

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
            <div className="guild-stats"><h2>Guild Statistics</h2></div>
            <div className="guild-class-chart">
              <ClassChart guildData={guildData} />
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Guild;
