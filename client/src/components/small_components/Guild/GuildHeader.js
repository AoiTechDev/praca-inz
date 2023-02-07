import React from 'react'

export const GuildHeader = ({guildData}) => {
    let ilvl_count = 0
    let highier_ilvl_counter = guildData?.guild?.member_count;
    guildData?.roster_profile?.map(ilvl => ilvl.equipped_item_level > 350 ? (ilvl_count = ilvl_count + ilvl.equipped_item_level) : ( highier_ilvl_counter = highier_ilvl_counter-1))
  return (
    <div className="guild-crest container-style">
            <div
              className="guild-fraction-icon"
              
            >
              <div className='fraction-icon' style={{
                backgroundImage:
                  guildData?.faction?.name === "Alliance"
                    ? `url(fraction/alliance.png)`
                    : `url(fraction/horde.png)`,
              }}></div>
            </div>
            <div className="guild-name">
              {guildData?.guild?.name}
              <div className="guild-server">
                {" "}
                {guildData?.guild?.realm?.name}
              </div>
            </div>
            <div className="guild-all-members">
              Members: {guildData?.guild?.member_count}{" "}
            </div>
            <div className="guild-avg-ilvl">Average item level: {Math.round(ilvl_count/highier_ilvl_counter)} </div>
          </div>
  )
}
