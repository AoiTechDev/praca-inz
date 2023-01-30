import React, {useState} from "react";
import "../styles/collection-styles.css";
//import Pagination from '@mui/material/Pagination';
//import Stack from '@mui/material/Stack';
import { Pagination } from "./small_components/Pagination";
function Collection({ data }) {
  //console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const [mountsPerPage] = useState(16);

    const indexOfLastMount = currentPage*mountsPerPage;
    const indexOfFirstMount = indexOfLastMount - mountsPerPage;
    
    const currentMounts = data.mounts_media.slice(indexOfFirstMount,indexOfLastMount)

    const paginate = (pageNumber, id) => {
        setCurrentPage(pageNumber)
        const a = document.getElementsByClassName('test')[0].getElementsByTagName('a')
        for(let i=0;i<a.length;i++){
            a[i].classList.remove('active')
        }
        a[id].classList.add('active')
    }

  
    const mounts = currentMounts.map((mount, index) =>
        <div key={index} 
            style={{
                backgroundImage: `url(${mount.assets[0].value})`
            }}
            className="mount-img"
        ></div>
    )
  return (
    <div className="section-container">

      <div className="section-title">Mounts</div>
    <Pagination mountsPerPage={mountsPerPage} totalMounts={data.mounts_media.length} paginate={paginate}/>
       
        {mounts}
    
    </div>
  );
}

export default Collection;
