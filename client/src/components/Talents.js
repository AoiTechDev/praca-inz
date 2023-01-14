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

    
    const class_talents = data.class_talents_media.map((spell, index) => 
        <div key={index} style={{
            backgroundImage: `url(${spell.assets[0].value})`
        }} className="spell_img"
            onMouseEnter={() => specTooltip(index)}>
            <div className="spell_tooltip class_tooltip">
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
        </div>
    )
    
    const spec_talents = data.spec_talents_media.map((spell, index) => 
    <div key={index} style={{
        backgroundImage: `url(${spell.assets[0].value})`
    }} className="spell_img"
        onMouseEnter={() => classTooltip(index)}
    >
         <div className="spell_tooltip spec_tooltip" >
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
    </div>
)
    return (  
    <>
        <div className="container">
            <div className="talents_container">
                {class_talents}
            </div>
            
            <div className="talents_container">
                {spec_talents}
            </div>
        </div>
    </>
    );
}

export default Talents;