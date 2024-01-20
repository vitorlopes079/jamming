import React from 'react';
import '../css/Tracklist.css';
import Track from './Track';

function Tracklist(props) {
  const { tracks, add, onRemove, isRemovable } = props;

  return (
    <div className="Tracklist">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={add} 
          onRemove={onRemove} 
          isRemovable={isRemovable} 
        />
      ))}
    </div>
  );
}

export default Tracklist;