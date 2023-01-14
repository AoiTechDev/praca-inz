import React from "react";
import "../styles/achiv-styles.css";


function Achievements({achiv, achivState,  subAchivState, subAchivs}) {

   
    
    console.log(achivState)

    const subCatAchivs = subAchivs.map((item, index) => 
        <div key={index} className="achiv-category">{item.name}</div>
    )
    return (
    <>
       

       {achivState === 0 ? <div className="achievements">{achiv}</div>  : 
       <> 
       <button onClick={subAchivState}>Back</button>
        <div className="achievements">{subCatAchivs}</div>
       </> 
       }
        
    </>
      
    );
}

export default Achievements;