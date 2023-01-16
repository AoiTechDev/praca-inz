import React, {useState} from "react";
import "../styles/talents-styles.css";

function Talents({data}) {

    const spec = data.talents.active_specialization.name
    const [spellInfo, setSpellInfo] = useState({
        name: "",
        rank: 0,
        cast_time: "",
        cooldown: "",
        description: "",
        power_cost: "",
        range: "",
    })
    
    const [isHover, setIsHover] = useState(false)

    const handleMouseOver = () => { 
        const tooltip = document.getElementsByClassName("tooltip_container")[0]
        if(isHover === false){
            tooltip.style.visibility = "visible"
        }
        setIsHover(true);
      };
    
    const handleMouseOut = () => {
        const tooltip = document.getElementsByClassName("tooltip_container")[0]
        if(isHover === true){
            tooltip.style.visibility = "hidden"
        }
        setIsHover(false);
    };
    


    function specTooltip(e){

        data.talents.specializations.map((idx) => {
            if(idx.specialization.name === spec){
                idx.loadouts.map((spec_idx)=>{
                    if(spec_idx.is_active){
                        //console.log(spec_idx.selected_class_talents[e].tooltip.talent.name)
                        let tmp = spec_idx.selected_class_talents[e]
                        setSpellInfo({
                            name: tmp.tooltip.talent.name,
                            rank: tmp.rank,
                            cast_time: tmp.tooltip.spell_tooltip.cast_time,
                            cooldown: tmp.tooltip.spell_tooltip.cooldown,
                            description: tmp.tooltip.spell_tooltip.description,
                            power_cost: tmp?.tooltip?.spell_tooltip?.power_cost,
                            range: tmp?.tooltip?.spell_tooltip?.range
                        })
                    }
                })
            }
        })
    }
    function classTooltip(e){
        
        data.talents.specializations.map((idx) => {
            if(idx.specialization.name === spec){
                idx.loadouts.map((spec_idx)=>{
                    if(spec_idx.is_active){
                        //console.log(spec_idx.selected_spec_talents[e].tooltip.talent.name)
                        let tmp = spec_idx.selected_spec_talents[e]
                        setSpellInfo({
                            name: tmp.tooltip.talent.name,
                            rank: tmp.rank,
                            cast_time: tmp.tooltip.spell_tooltip.cast_time,
                            cooldown: tmp.tooltip.spell_tooltip.cooldown,
                            description: tmp.tooltip.spell_tooltip.description,
                            power_cost: tmp?.tooltip?.spell_tooltip?.power_cost,
                            range: tmp?.tooltip?.spell_tooltip?.range
                        })
                    }
                })
            }
        })
    }

   


    
    // function talentTooltip(e){
    //     // data.talents.specializations.map((idx) => {
    //     //     console.log(idx, e)
    //     // })
       
    //     const spell = document.getElementsByClassName("spell_img")[e]
        
    // }
    
    
    const class_talents = data.class_talents_media.map((spell, index) => 
        <div key={index} style={{
            backgroundImage: `url(${spell.assets[0].value})`
        }} className="spell_img spec_talents"
            onMouseEnter={() => {specTooltip(index), handleMouseOver()}}
            onMouseLeave={handleMouseOut}
            >
              
        </div>
    )
    
    const spec_talents = data.spec_talents_media.map((spell, index) => 
    <div key={index} style={{
        backgroundImage: `url(${spell.assets[0].value})`
    }} className="spell_img class_talents"
    onMouseEnter={() => {classTooltip(index), handleMouseOver()}}
    onMouseLeave={handleMouseOut}
    >
    </div>
)
    return (  
    <>
        <div className="container">
            <div className="talents_container">
                <div className="classname class"><h2>Class Talents</h2></div>
                {class_talents}
            </div>
            <div className="tooltip_container">
                 <div className="name">{spellInfo.name}</div>
                <div className="rank">Rank: {spellInfo.rank}/{spellInfo.rank}</div>

                <div className="cast">
                    <div>{spellInfo.cast_time}</div>
                    <div>{spellInfo.cooldown}</div>
                </div>
                <div>{spellInfo.range}</div>
                <div> {spellInfo.power_cost}</div>
               
                <div className="description">{spellInfo.description}</div>
            </div>
            <div className="talents_container">
                <div className="classname spec"><h2>Specialization Talents</h2></div>
                {spec_talents}
            </div>
        </div>
    </>
    );
}

export default Talents;