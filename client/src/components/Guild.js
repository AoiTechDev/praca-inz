import React, { useState } from "react";

import "../styles/guild-styles.css";
import { useOutletContext } from "react-router-dom";

function Guild() {
  const { guildData, guildFetch, getGuildMember } = useOutletContext();
  const [memberClickState, setMemberClickState] = useState(0);
  const [memberClick, setMemberClick] = useState(false);
  console.log(guildData);
  const guildMembers = guildData?.roster_profile?.map((member, index) => (
    <div
      className="guild-members"
      key={index}
      onClick={() => guildMemberToggle(index)}
    >
      <div className="member-name">{member?.name}</div>
      <div>{member?.level}</div>
      <div>{member?.equipped_item_level}</div>
      <div>{guildData?.roster?.members[index]?.rank}</div>
      <div className="member-more-stats">asd</div>
    </div>
  ));

  function guildMemberToggle(id) {
    //console.log(guildData?.roster_profile[id])
    const members = document.getElementsByClassName("guild-members");
    const member = document.getElementsByClassName("guild-members")[id];
    const members_stats = document.querySelectorAll(
      ".guild-members .member-more-stats"
    );
    const member_stats = document.querySelectorAll(
      ".guild-members .member-more-stats"
    )[id];
    console.log(memberClickState);
    console.log(id);

    for (let i = 0; i < members.length; i++) {
      members[i].classList.remove("active-member");
      members_stats[i].style.visibility = "hidden";
    }

    if (memberClickState === id) {
      console.log(memberClick)
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
    <div className="guild-container ">
      {guildFetch && (
        <>
          <div className="guild-crest container-style">
            <div
              className="guild-fraction-icon"
              style={{
                backgroundImage:
                  guildData?.faction?.name === "Alliance"
                    ? `url(fraction/alliance.png)`
                    : `url(fraction/horde.png)`,
              }}
            ></div>
            <div className="guild-name">
              {guildData?.guild?.name}
              <div className="guild-server">
                {" "}
                {guildData?.guild?.realm?.name}
              </div>
            </div>
            <div className="guild-all-members">
              Members: {guildData?.guild?.member_count}{" "}
            </div>
          </div>
          <div className="guild-roster container-style">
            <div className="guild-members-header">
              <div>Name</div>
              <div>Level</div>
              <div>Item Level</div>
              <div>Rank</div>
            </div>
            {guildMembers}
          </div>
        </>
      )}
    </div>
  );
}

export default Guild;
