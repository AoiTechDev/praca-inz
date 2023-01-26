import React from "react";
import "../../styles/dungeons-styles.css";
import affixes_data from "../../affixes/affixes";
function DungStats({ data, dungId }) {
  const dungStats = data.dungeons.best_runs[dungId];
  const map_r = dungStats.map_rating.color.r;
  const map_g = dungStats.map_rating.color.g;
  const map_b = dungStats.map_rating.color.b;

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
    <div key={index} className="dung-member"
        style={{
            color: data.profile.name === member.character.name && 'green'
        }}
    >
      <div className="dung-member-name">{member.character.name} </div>
      <div className="dung-member-realm"> {member.character.realm.slug}</div>
      <div className="dung-member-ilvl">{member.equipped_item_level}</div>
      <div className="dung-member-spec">{member.specialization.name}</div>
      <div className="dung-member-race">{member.race.name}</div>
    </div>
  ));
  return (
    <div className="dung-stats">
      <div className="dung-inside-name">
        <span >{dungStats.dungeon.name}</span>
        <span
          style={{
            color: `rgb(${map_r}, ${map_g}, ${map_b})`,
          }}
        >
          {dungStats.keystone_level}
        </span>
      </div>
      <div className="affixes-container">{affixes}</div>
      <div
        className="map-rating"
        style={{
          color: `rgb(${map_r}, ${map_g}, ${map_b})`,
        }}
      >
        <span>Map rating:</span> {Math.round(dungStats.map_rating.rating)}
      </div>
      <div className="dung-members">{members}</div>
    </div>
  );
}

export default DungStats;
