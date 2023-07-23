import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import React, { useState, useEffect } from 'react';

function App() {
  // State variables
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Constants
  const clientId = '017211e68cc247cca8b8f73233cf6d5d';
  const redirectUri = 'https://jammingplay.netlify.app/callback';

  // Scopes required for playlist creation
  const scopes = ['playlist-modify-public', 'playlist-modify-private'];

  // Handle access token retrieval from URL and login state update
  useEffect(() => {
    const hashParams = window.location.hash.substr(1);
    const urlParams = new URLSearchParams(hashParams);
    const token = urlParams.get('access_token');
  
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
      window.history.replaceState(null, '', '/');
    }
  }, []);

  // Handle Spotify login
  const handleLogin = () => {
    const responseType = 'token';
  
    // Construct the scope string by joining the scopes array with spaces
    const scopeString = scopes.join(' ');
  
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopeString)}&response_type=${responseType}`;
  
    window.location.href = authUrl;
  };

  // Perform Spotify search
  const searchSpotify = (searchTerm) => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }

    fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(searchTerm)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.tracks && data.tracks.items) {
          const tracks = data.tracks.items.map((item) => ({
            id: item.id,
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            uri: item.uri,
          }));
          setSearchResults(tracks);
        } else {
          setSearchResults([]);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  // Handle adding a track to the playlist
  function handleAdd(track) {
    setSelectedTracks((prevSelectedTracks) => [...prevSelectedTracks, track]);
  }

  // Handle removing a track from the playlist
  function handleRemove(trackId) {
    const updatedTracks = selectedTracks.filter((track) => track.id !== trackId);
    setSelectedTracks(updatedTracks);
  }

  return (
    <div className='app'>
      <div className="BackgroundContainer"></div>
      <div className='logo-bar'>
        <h2>Ja<span>mmi</span>ng</h2>
      </div>
      <div className="top-container">
        {/* SearchBar component */}
        <SearchBar onSearch={searchSpotify} isLoggedIn={isLoggedIn} login={handleLogin} />
      </div>
      {searchResults.length > 0 && (
        <div className="bottom-container">
          {/* SearchResults component */}
          <SearchResults tracks={searchResults} onAdd={handleAdd}/>
          {/* Playlist component */}
          <Playlist selectedTracks={selectedTracks} setSelectedTracks={setSelectedTracks} onRemove={handleRemove} accessToken={accessToken} />
        </div>
      )}
      
    </div>
  );
}

export default App;