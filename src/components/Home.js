import React from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

const Home = ({
  onSearch,
  isLoggedIn,
  login,
  tracks,
  onAdd,
  selectedTracks,
  setSelectedTracks,
  onRemove,
  accessToken,
}) => {
  return (
    <div>
      <div className="top-container">
        <SearchBar onSearch={onSearch} isLoggedIn={isLoggedIn} login={login} />
      </div>
      {tracks.length > 0 && (
        <div className="bottom-container">
          <SearchResults tracks={tracks} onAdd={onAdd} />

          <Playlist
            selectedTracks={selectedTracks}
            setSelectedTracks={setSelectedTracks}
            onRemove={onRemove}
            accessToken={accessToken}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
