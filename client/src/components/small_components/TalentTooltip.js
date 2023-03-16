import React from 'react'

export const TalentTooltip = ({spellInfo}) => {
  return (
    <div className="tooltip_container">
          <div className="name">{spellInfo.name}</div>
          <div className="rank">
            Rank: {spellInfo.rank}/{spellInfo.rank}
          </div>

          <div className="cast">
            <div>{spellInfo.cast_time}</div>
            <div>{spellInfo.cooldown}</div>
          </div>
          <div>{spellInfo.range}</div>
          <div> {spellInfo.power_cost}</div>

          <div className="description">{spellInfo.description}</div>
        </div>
  )
}
