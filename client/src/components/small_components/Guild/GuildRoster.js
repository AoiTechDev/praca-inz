import React from "react";

export const GuildRoster = ({ guildMembers }) => {
  return (
    <div className="guild-roster container-style">
      <div className="guild-members-header-container">
        <div className="guild-members-header">
          <div>Name</div>
          <div>Level</div>
          <div>Item Level</div>
          <div>Rank</div>
        </div>
      </div>
      <div className="members-container">{guildMembers}</div>
    </div>
  );
};
