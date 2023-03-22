import React from "react";
function ShrinkPlayerStats({mainCharacterData}) {
    return (
     <>
        <div className="health-rage">
            <div className="health">{mainCharacterData?.stats?.health}</div>
            <div className="rage">
                <div> 
                    {mainCharacterData?.stats?.power_type?.name}
                </div>
                <div>
                    {mainCharacterData?.stats?.power}
                </div>
            </div>
        </div>
        <hr/>
        <div className="primary-stats">
            <p className="stats-text">Stamina: {mainCharacterData?.stats?.stamina?.base}</p>
            <p className="stats-text">Strength: {mainCharacterData?.stats?.strength?.base}</p>
            <p className="stats-text">Intellect: {mainCharacterData?.stats?.intellect?.base}</p>
            <p className="stats-text">Agility: {mainCharacterData?.stats?.agility?.base}</p>
        </div>  
        <hr/>
        <div className="secondary-stats">
            <p className="stats-text">Mastery: {mainCharacterData?.stats?.mastery?.rating}</p>
            <p className="stats-text">Haste: {mainCharacterData?.stats?.spell_haste?.rating}</p>
            <p className="stats-text">Versatility: {mainCharacterData?.stats?.versatility} </p>
            <p className="stats-text">
                Critical Strike: {mainCharacterData?.stats?.spell_crit?.rating}
            </p>
        </div>
        <div className="minor-stats">

        </div>
    </> );
}

export default ShrinkPlayerStats;