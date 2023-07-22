import React, { useState } from 'react';
import './Playlist.css';
import Track from './Track';
import Tracklist from './Tracklist';

function Playlist(props) {
  const [playlistName, setPlaylistName] = useState('');

  function handleChange(event) {
    setPlaylistName(event.target.value);
  }
  function handleSaveToSpotify() {
    if (playlistName.trim() === '') {
      alert('Please enter a playlist name.');
      return;
    }

    // Create a playlist with the name and selected tracks
    const playlist = {
      name: playlistName,
      tracks: props.selectedTracks,
    };

    // Save the playlist or display an alert with the playlist details
    alert(`Playlist saved: ${playlist.name}\nTotal tracks: ${playlist.tracks.length}`);
  }

  return (
    <div className='Playlist'>
      <input type='text' value={playlistName} onChange={handleChange} placeholder="Playlist name" />
      <div className="track-container"> {/* Add track-container class */}
        {props.selectedTracks.map((track) => (
          <Track key={track.id} track={track} onRemove={() => props.onRemove(track.id)} isRemovable={true} />
        ))}
      </div>
      <div>
        <button type='button' onClick={handleSaveToSpotify}>Save to Spotify</button>
      </div>
    </div>
  );

}

export default Playlist;