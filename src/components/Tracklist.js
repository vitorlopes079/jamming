import React from 'react';
import './Tracklist.css';
import Track from './Track';

function Tracklist(props) {
  const { tracks, add, onRemove, isRemovable } = props;

  return (
    <div className="Tracklist">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={add} // Use the 'add' prop when rendering in SearchResults
          onRemove={onRemove} // Use the 'onRemove' prop when rendering in Playlist
          isRemovable={isRemovable} // Pass the 'isRemovable' prop from the parent component
        />
      ))}
    </div>
  );
}

export default Tracklist;