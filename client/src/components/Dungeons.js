import React, {useState} from "react";
import '../styles/dungeons-styles.css';
import DungStats from "./medium_components/DungStats";
import BackButton from "./small_components/BackButton";

function Dungeons({data}) {

    const [dungState, setDungState] = useState('dungeons')
    const [dungId,setDungId] = useState(0)

    function addDungState(id){
        setDungId(id)
        setDungState('dung_stats')
    }
    function subDungState(){
        setDungState('dungeons')
    }

    

    
//     const best_dung_run = data.dungeons.best_runs.map((dung, index) => 
//       <div key={index} className="dungeon" onClick={() => addDungState(index)}>
//           {dung.dungeon.name}
//       </div> 
//   )


  const test = data.dungeons.current_period.best_runs.map((dung, index) => 
  <div key={index} className="dungeon" onClick={() => addDungState(index)}>
     <div className="dung-name">{dung.dungeon.name}</div>
  </div> 
)


    return ( 
   
    <div className="dung_container">
         {dungState === 'dung_stats' && <BackButton onClick={subDungState} />}
         {dungState === 'dungeons' && <div className="dung_title"> Dungeons</div>}

        
        {dungState === 'dungeons' ? test : <DungStats data={data} dungId={dungId}/>}
        {/* <DungStats data={data}/> */}
    </div> 
    );
}

export default Dungeons;