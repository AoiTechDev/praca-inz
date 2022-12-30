import React from "react";
import "../styles/achiv-styles.css";


function Achievements({achiv, achivState,  subAchivState}) {

   
    
    
    return (
    <>
        {achivState != 0 && <button onClick={subAchivState}>Back</button>}
        <div className="achievements">
        {/* {achivState === 0 ? achiv : subAchivCategory} */}
        {achiv}
        </div>
    </>
      
    );
}

export default Achievements;