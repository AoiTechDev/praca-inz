import React from "react";
import "../styles/achiv-styles.css";
import BackButton from "./small_components/BackButton";
import SmallSlider from "./SmallSlider";
function Achievements({
  achiv,
  achivState,
  subAchivState,
  subAchivs,
  getAchivsByCategory,
  changeToAchivs,
  achivsData,
  categoryState,
  ObjectsNLoaders,
}) {
  const subCatAchivs = subAchivs.map((item, index) => (
    <div key={index} className="achiv-category">
      <div
        className="achiv_name"
        onClick={async () => {
          if (categoryState !== "Character") {
            await getAchivsByCategory(item?.id);
            changeToAchivs();
          }
        }}
      >
        {item?.name}
      </div>
    </div>
  ));

  const achivs = achivsData?.achievements?.map((item) =>
    ObjectsNLoaders.achievements.achievementsData?.achiv?.achievements?.map(
      (ach, idx) => {
        if (ach?.id === item?.id) {
          return (
            <div className="achiv" key={idx}>
              {item?.name}
            </div>
          );
        }
      }
    )
  );

  return ObjectsNLoaders.achievements.achievementsData ? (
    <>
      <div
        className="achievements-container"
        style={{
          minHeight: ObjectsNLoaders.achievements.achievementsLoader && "150px",
        }}
      >
        {ObjectsNLoaders.achievements.achievementsLoader && <SmallSlider />}
        {achivState !== "category" && <BackButton onClick={subAchivState} />}
        <div className="achiv_title">Achievements</div>
        {achivState === "category"
          ? achiv
          : achivState === "subcategory"
          ? subCatAchivs
          : achivs}
      </div>
    </>
  ) : null;
}

export default Achievements;
