import React from "react";
import "../../styles/dungeons-styles.css";
import affixes_data from "../../affixes/affixes";
function DungStats({ data, dungId }) {
  //     <div key={index} className="affix"
  //     style={{
  //         backgroundImage: affixes_data.map((item) =>
  //            console.log(item.name === affix.name)
  //         )
  //     }}
  // >{affix.name}</div>

  const dungStats = data.dungeons.current_period.best_runs[dungId];

  const affixes = dungStats.keystone_affixes.map((affix) =>
    affixes_data.map((item, index) => {
      return (
        item.name === affix.name && (
          <div
            key={index}
            style={{
              backgroundImage: `url(affixes/${item.imgUrl})`,
            }}
            className="affix"
          >
            <div className="affix-tooltip">
              <div className="affix-name">{item.name}</div>
              <div className="affix-description">{item.description}</div>
            </div>
          </div>
        )
      );
    })
  );

  const members = dungStats.members.map((member, index) => (
    <div key={index} className="dung-member">
      <div className="dung-member-name">{member.character.name} </div>
      <div className="dung-member-realm"> {member.character.realm.slug}</div>

      <div className="dung-member-ilvl">{member.equipped_item_level}</div>
      <div className="dung-member-spec">{member.specialization.name}</div>
      <div className="dung-member-race">{member.race.name}</div>
    </div>
  ));
  return (
    <div className="dung-stats">
      <div className="dung-inside-name">{dungStats.dungeon.name}</div>
      <div className="affixes-container">{affixes}</div>
      <div className="dung-members">{members}</div>
    </div>
  );
}

export default DungStats;
