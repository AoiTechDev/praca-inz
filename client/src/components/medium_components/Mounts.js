import React, {useState} from "react";
import { Pagination } from "../small_components/Pagination";

export const Mounts = ({data, currentMountPage, paginate, collectionState}) => {
 
  const [mountsPerPage] = useState(18);
  const indexOfLastMount = currentMountPage * mountsPerPage;
  const indexOfFirstMount = indexOfLastMount - mountsPerPage;

  const currentMounts = data.mounts_media.slice(
    indexOfFirstMount,
    indexOfLastMount
  );



  const mounts = currentMounts.map((mount, index) => (
    <div className="collection-container" key={index}>
      <div
        style={{
          backgroundImage: `url(${mount.assets[0].value})`,
        }}
        className="collection-img"
      ></div>
      <div className="collection-info">
        {data.mounts.map(
          (item) => item.creature_displays[0].id === mount.id && item.name
        )}
      </div>
    </div>
  ));

  return (
    <>
      <Pagination
        mountsPerPage={mountsPerPage}
        totalMounts={data.mounts_media.length}
        paginate={paginate}
        collectionState={collectionState}
      />
      {mounts}
    </>
  );
};
