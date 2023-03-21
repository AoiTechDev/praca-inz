import React from "react";
import "../styles/achiv-styles.css";
import BackButton from "./small_components/BackButton";

function Achievements({
  achiv,
  achivState,
  subAchivState,
  subAchivs,
  data,
  getAchivsByCategory,
  changeToAchivs,
  achivsData,
  categoryState
}) {
  const subCatAchivs = subAchivs.map((item, index) => (
    <div key={index} className="achiv-category">
      <div
        className="achiv_name"
        onClick={async () => {
          if(categoryState !== 'Character'){
            await getAchivsByCategory(item.id);
            changeToAchivs();
          }
         
        }}
      >
        {item.name}
      </div>
    </div>
  ));
 
  const achivs = achivsData?.achievements?.map((item) =>
    data?.achiv?.achievements?.map((ach, idx) => {
      if (ach.id === item.id) {
        return (
          <div
            className="achiv"
            key={idx}
          
          >
            {item.name}
          </div>
        );
      }
    })
  );
  return (
    <>
      <div className="achievements">
        {achivState !== "category" && <BackButton onClick={subAchivState} />}
        <div className="achiv_title">Achievements</div>
        {achivState === "category"
          ? achiv
          : achivState === "subcategory"
          ? subCatAchivs
          : achivs}
      </div>
    </>
  );
}

export default Achievements;
