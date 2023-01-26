import React from "react";
import "../../styles/raids-styles.css";

function RaidStats({ data, raidId }) {
  //     <div key={index} className="mod-container">
  //     <div className="mod-name">{mod.difficulty.type}</div>
  //     <div className="progress">
  //       <div className="progress-proc">
  //         {mod.progress.completed_count}/{mod.progress.total_count}
  //       </div>
  //       <div
  //         className="progress-bar"
  //         style={{
  //           width: `${
  //             (mod.progress.completed_count / mod.progress.total_count) * 100
  //           }%`,
  //         }}
  //       ></div>
  //       <div className="progress-tooltip">
  //         {mod.progress.encounters.map((encounter, idx) => (
  //           <div key={idx}>{encounter.encounter.name}</div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>

  const raids = data?.raids?.expansions[raidId]?.instances?.map(
    (instance, index) => (
      <div key={index} className="instance-container">
        <div className="instance-name">{instance.instance.name} </div>
        {instance.modes.map((mode, idx) => (
          <div key={idx} className="mod-container">
            <div className="mod-name">{mode.difficulty.type}</div>
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
                {mode.progress.encounters.map((encounter, i) => (
                  <div key={i}>{encounter.encounter.name}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );

  return <div className="raids-stats-container">{raids}</div>;
}

export default RaidStats;
