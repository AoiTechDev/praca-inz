import React, { useState } from "react";
import "../styles/dungeons-styles.css";
import DungStats from "./medium_components/DungStats";
import BackButton from "./small_components/BackButton";
import dungeons_imgs from "../affixes/dunegonsImg";
function Dungeons({ data }) {
  const [dungState, setDungState] = useState("dungeons");
  const [dungId, setDungId] = useState(0);
  const mythic_rating = data.dungeons.current_mythic_rating.color;
  function addDungState(id) {
    setDungId(id);

    setDungState("dung_stats");
  }
  function subDungState() {
    setDungState("dungeons");
  }

  const dungeons = data.dungeons.current_period.best_runs.map((dungeons, index) =>
    dungeons_imgs.map((dungeon) => {
      return (
        dungeon.name === dungeons.dungeon.name &&
        dungeons.is_completed_within_time && (
          <div
            key={index}
            className="dungeon"
            onClick={() => addDungState(index)}
            style={{
              backgroundImage: `url(dungeons/${dungeon.imgUrl})`,
            }}
          >
            <div className="dung-name">{dungeons.dungeon.name}</div>
          </div>
        )
      );
    })
  );

  return (
    <div className="dung_container">
      {dungState === "dung_stats" && <BackButton onClick={subDungState} />}
      {dungState === "dungeons" && (
        <div className="dung-header">
          <div className="dung-title">Current Dungeons</div>
          <div className="dung-rating">
            <span>Mythic rating: </span>
            <span
              style={{
                color: `rgb(${mythic_rating.r},${mythic_rating.g}, ${mythic_rating.b})`,
              }}
            >
              {Math.round(data.dungeons.current_mythic_rating.rating)}
            </span>
          </div>
        </div>
      )}

      {dungState === "dungeons" ? (
        dungeons
      ) : (
        <DungStats data={data} dungId={dungId} />
      )}
      {/* <DungStats data={data}/> */}
    </div>
  );
}

export default Dungeons;
