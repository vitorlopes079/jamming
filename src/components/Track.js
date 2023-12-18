import React from "react";
import "./Track.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function Track(props) {
  const { track, onAdd, onRemove, isRemovable } = props;

  return (
    <div className="track">
      <div>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {isRemovable ? (
        <FontAwesomeIcon className="minus" icon={faMinus} onClick={() => onRemove(track.id)} />
      ) : (
        <FontAwesomeIcon className="plus" icon={faPlus} onClick={() => onAdd(track)} />
      )}
    </div>
  );
}

export default Track;
