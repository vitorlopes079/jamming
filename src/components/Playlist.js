import React, { useState, useEffect } from "react";
import "../css/Playlist.css";
import Track from "./Track";

function Playlist(props) {
  const [playlistName, setPlaylistName] = useState("");
  const [userId, setUserId] = useState(null); // To store the user's Spotify ID

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error("Failed to get user data: " + JSON.stringify(json));
          });
        }
        return response.json();
      })
      .then((data) => {
        setUserId(data.id); // Set the user's Spotify ID
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [props.accessToken]);

  function handleChange(event) {
    setPlaylistName(event.target.value);
  }

  function handleSaveToSpotify() {
    const trimmedPlaylistName = playlistName.trim(); // Remove leading and trailing spaces

    if (trimmedPlaylistName === "") {
      alert("Please enter a playlist name.");
      return;
    }

    if (props.selectedTracks.length === 0) {
      alert("Please add tracks to the playlist before saving.");
      return;
    }

    // Create a playlist with the trimmed name
    const playlistData = {
      name: trimmedPlaylistName,
      public: true,
      description: "My Jamming Playlist",
    };

    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistData),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle API error response
          return response.text().then((errorMessage) => {
            throw new Error(
              errorMessage || "Failed to create playlist on Spotify"
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Playlist creation response:", data);
        if (data.id) {
          // Playlist successfully created, now add tracks to the playlist
          const playlistId = data.id; // Get the ID of the newly created playlist
          const trackUris = props.selectedTracks.map((track) => track.uri);

          // Add tracks to the playlist using the "uris" attribute
          fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${props.accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                uris: trackUris, // Use the track URIs to add tracks to the playlist
              }),
            }
          )
            .then((response) => {
              if (!response.ok) {
                // Handle API error response
                return response.text().then((errorMessage) => {
                  throw new Error(
                    errorMessage || "Failed to add tracks to the playlist"
                  );
                });
              }
              return response.json();
            })
            .then((data) => {
              console.log("Added tracks to playlist:", data);

              // Display success message or handle the response as needed
              alert("Your playlist was successfully saved");
              setPlaylistName(""); // Clear the input field after successful playlist creation

              // Clear the selected tracks
              props.setSelectedTracks([]);
            })
            .catch((error) => {
              console.log("Error:", error);
              alert("Failed to add tracks to the playlist");
            });
        } else {
          console.log("Unexpected response:", data);
          alert("Error occurred while saving the playlist. Please try again.");
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
        alert("Error occurred while saving the playlist. Please try again.");
      });
  }

  return (
    <div className="Playlist">
      <div className="flex">
        <input
          type="text"
          value={playlistName}
          onChange={handleChange}
          placeholder="Playlist name"
        />
      </div>

      <div className="track-container">
        {props.selectedTracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onRemove={() => props.onRemove(track.id)}
            isRemovable={true}
          />
        ))}
      </div>
      <div className="flex">
        <button
          className="button-37"
          type="button"
          onClick={handleSaveToSpotify}
        >
          Save to Spotify
        </button>
      </div>
    </div>
  );
}

export default Playlist;
