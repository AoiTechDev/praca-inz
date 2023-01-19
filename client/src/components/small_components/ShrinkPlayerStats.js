import React from "react";
function ShrinkPlayerStats({data}) {
    return (
     <>
        <div className="health-rage">
            <div className="health">{data.stats.health}</div>
            <div className="rage">
                <div> 
                    {data.stats.power_type.name}
                </div>
                <div>
                    {data.stats.power}
                </div>
            </div>
        </div>
        <hr/>
        <div className="primary-stats">
            <p className="stats-text">Stamina: {data.stats.stamina.base}</p>
            <p className="stats-text">Strength: {data.stats.strength.base}</p>
            <p className="stats-text">Intellect: {data.stats.intellect.base}</p>
            <p className="stats-text">Agility: {data.stats.agility.base}</p>
        </div>  
        <hr/>
        <div className="secondary-stats">
            <p className="stats-text">Mastery: {data.stats.mastery.rating}</p>
            <p className="stats-text">Haste: {data.stats.spell_haste.rating}</p>
            <p className="stats-text">Versatility: {data.stats.versatility} </p>
            <p className="stats-text">
                Critical Strike: {data.stats.spell_crit.rating}
            </p>
        </div>
        <div className="minor-stats">

        </div>
    </> );
}

export default ShrinkPlayerStats;