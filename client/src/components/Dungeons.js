import React, { useState } from "react";
import "../styles/dungeons-styles.css";
import DungStats from "./medium_components/DungStats";
import BackButton from "./small_components/BackButton";
import dungeons_imgs from "../affixes/dunegonsImg";
import SmallSlider from "./SmallSlider";
function Dungeons({  ObjectsNLoaders }) {
  const [dungState, setDungState] = useState("dungeons");
  const [dungId, setDungId] = useState(0);
  const mythic_rating = ObjectsNLoaders.dungeons.dungeonsData?.dungeons?.mythic_rating?.color;
  function addDungState(id) {
    setDungId(id);

    setDungState("dung_stats");
  }
  function subDungState() {
    setDungState("dungeons");
  }

  const dungeons = ObjectsNLoaders.dungeons.dungeonsData?.dungeons?.best_runs?.map((dungeons, index) =>
    dungeons_imgs.map((dungeon) => {
    
      return (
        dungeon?.name === dungeons?.dungeon?.name &&
        dungeons?.is_completed_within_time && (
          <div
            key={index}
            className="dungeon"
            onClick={() => addDungState(index)}
            style={{
              backgroundImage: `url(dungeons/${dungeon?.imgUrl})`,
            }}
          >
            <div className="dung-name">{dungeons?.dungeon?.name}</div>
          </div>
        )
      );
    })
  );

  
  return (
  
    <div className="dung_container" style={{
      minHeight: ObjectsNLoaders.dungeons.dungeonsLoader && '150px'
    }}>
      {ObjectsNLoaders.dungeons.dungeonsLoader && <SmallSlider/>}
      {dungState === "dung_stats" && <BackButton onClick={subDungState} />}
      {dungState === "dungeons" && (
        <div className="dung-header">
          <div className="dung-title">Dungeons</div>
          <div className="dung-rating">
            <span>Mythic rating: </span>
            <span
              style={{
                color: `rgb(${mythic_rating?.r},${mythic_rating?.g}, ${mythic_rating?.b})`,
              }}
            >
              {Math.round(ObjectsNLoaders?.dungeons?.dungeonsData?.dungeons?.mythic_rating?.rating).toString()}
            </span>
          </div>
        </div>
      )}

      {dungState === "dungeons" ? (
        dungeons
      ) : (
        <DungStats data={ObjectsNLoaders.dungeons.dungeonsData} dungId={dungId} />
      )}
      
    </div>
  )
}

export default Dungeons;
