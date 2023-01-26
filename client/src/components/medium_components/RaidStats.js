import React from "react";
import "../../styles/raids-styles.css";

function RaidStats({ data, raidId }) {

  const raids = data?.raids?.expansions[raidId]?.instances?.map(
    (instance, index) => (
      <div key={index} className="instance-container">
        <>
          <div className="instance-name">{instance.instance.name}</div>
          {instance.modes.map((mode, idx) => (
            <div key={idx} className="mode-container">
              <div className="instance-type">{mode.difficulty.name}</div>
              <div className="progress">
                <div className="progress-proc">
                  {mode.progress.completed_count}/{mode.progress.total_count}
                </div>
                <div
                  className="progress-bar"
                  style={{
                    width: `${
                      (mode.progress.completed_count /
                        mode.progress.total_count) *
                      100
                    }%`,
                  }}
                ></div>
                <div className="progress-tooltip">
                    <div className="progress-tooltip-title">
                        Killed Bosses
                    </div>
                  {mode.progress.encounters.map((encounter, i) => (
                    
                    <div key={i}>{encounter.encounter.name}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    )
  );

  return <div className="raids-stats-container">{raids}</div>;
}

export default RaidStats;
