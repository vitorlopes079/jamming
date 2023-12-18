import "./App.css";
import Home from "./components/Home";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";

function App() {
  // State variables
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Constants
  const clientId = "017211e68cc247cca8b8f73233cf6d5d";
  const redirectUri = "https://jammingplay.netlify.app/home/callback"

  // Scopes required for playlist creation
  const scopes = ["playlist-modify-public", "playlist-modify-private"];

  // Handle access token retrieval from URL and login state update
  useEffect(() => {
    const hashParams = window.location.hash.substr(1);
    const urlParams = new URLSearchParams(hashParams);
    const token = urlParams.get("access_token");

    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
      window.history.replaceState(null, "", "/home");
    }
  }, []);

  // Handle Spotify login
  const handleLogin = () => {
    const responseType = "token";

    // Construct the scope string by joining the scopes array with spaces
    const scopeString = scopes.join(" ");

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

    console.log("Access Token:", accessToken); // Log the access token
    console.log("Authorization Header:", `Bearer ${accessToken}`);

    fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
        searchTerm
      )}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          // Handle non-OK responses
          if (response.status === 403) {
            console.error("403 Forbidden - Possible token issue");
          }
          return response.text().then((text) => {
            try {
              const jsonData = JSON.parse(text);
              throw new Error(
                jsonData.error.message || "Error fetching search results"
              );
            } catch (e) {
              throw new Error(text);
            }
          });
        }
        return response.json();
      })
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
        console.error("Search Error:", error);
      });
  };
  // Handle adding a track to the playlist
  function handleAdd(track) {
    setSelectedTracks((prevSelectedTracks) => [...prevSelectedTracks, track]);
  }

  // Handle removing a track from the playlist
  function handleRemove(trackId) {
    const updatedTracks = selectedTracks.filter(
      (track) => track.id !== trackId
    );
    setSelectedTracks(updatedTracks);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <Home
                onSearch={searchSpotify}
                isLoggedIn={isLoggedIn}
                login={handleLogin}
                tracks={searchResults}
                onAdd={handleAdd}
                selectedTracks={selectedTracks}
                setSelectedTracks={setSelectedTracks}
                onRemove={handleRemove}
                accessToken={accessToken}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
