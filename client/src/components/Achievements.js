import React from "react";
import "../styles/achiv-styles.css";
import BackButton from "./small_components/BackButton";

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
        <div className="achievements">
            { achivState === 'subcategory' && <BackButton onClick={subAchivState} />}
            <div className="achiv_title">Achievements</div>
            { achivState === 'category' ? 
            achiv : 
            subCatAchivs }
        </div> 
        

        
    </>
   
    );
}

export default Achievements;