import React from "react";

import "../styles/guild-styles.css";
import { useOutletContext } from "react-router-dom";

function Guild() {
  const { guildData, guildFetch, getGuildMember } = useOutletContext();


  const guildMembers = guildData?.roster_profile?.map((member, index) => (
    <div className="member" key={index}>
      <div onClick={() => getGuildMember(member?.name)}>{member?.name}</div>
      <div>{member?.level}</div>
      <div>{member?.equipped_item_level}</div>
      <div>{guildData?.roster?.members[index].rank}</div>
    </div>
  ));



  return (
    <div className="main">
      {guildFetch && (
        <div className="content">
          <div className="titles">
            <div>Name</div>
            <div>Level</div>
            <div>Item Level</div>
            <div>Rank</div>
          </div>
          <div
            className="guild-members"
            style={{
              overflowY: guildFetch && "scroll",
            }}
          >
            <a>{guildMembers}</a>
          </div>

          {/* <div className="guild-content">
          <h1>{guildData.guild.name}</h1>
          <div className="guild-member-info">
          {guildMember.profile.name} 

          </div>
        </div> */}
        </div>
      )}
    </div>
  );
}

export default Guild;
