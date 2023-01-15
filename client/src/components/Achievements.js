import React from "react";
import "../styles/achiv-styles.css";


function Achievements({achiv, achivState,  subAchivState, subAchivs,data}) {

   
    

    
    const subCatAchivs = subAchivs.map((item, index) => 
        <div key={index} className="achiv-category">
            {item.name}
            {data.achiv.category_progress.map((category, idx)=>{
                return category.category.id === item.id ? <div key={idx}>{category.points}</div> : ''
            }
            )}
        </div>
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