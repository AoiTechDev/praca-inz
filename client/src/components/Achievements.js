import React from "react";
import "../styles/achiv-styles.css";


function Achievements({achiv, achivState,  subAchivState, subAchivs,data}) {

   
    

    
    const subCatAchivs = subAchivs.map((item, index) => 
        <div key={index} className="achiv-category">
        <div className="achiv_name"> 
        {item.name}
            {data.achiv.category_progress.map((category, idx)=>{
                return category.category.id === item.id ? <div key={idx} className="points">{category.points}</div> : ''
            }
            )}</div>
           
        </div>
    )
    return (
    <>
       
        
       {achivState === 0 ? <div className="achievements">
        <div className="achiv_title">Achievements</div>
        {achiv}</div>  : 
       <> 
       <button onClick={subAchivState} className="achiv_button">Back</button>
        <div className="achievements">
        <div className="achiv_title">Achievements</div>
            {subCatAchivs}</div>
       </> 
       }
        
    </>
      
    );
}

export default Achievements;