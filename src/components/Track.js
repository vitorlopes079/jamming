import React from 'react';
import './Track.css';

function Track(props) {
  const { track, onAdd, onRemove, isRemovable } = props;

  return (
    <div className="track">
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {isRemovable ? (
        <div className="minus-symbol" onClick={() => onRemove(track.id)}><p>-</p></div>
      ) : (
        <div className="plus-symbol" onClick={() => onAdd(track)}><p>+</p></div>
      )}
    </div>
  );
}

export default Track;