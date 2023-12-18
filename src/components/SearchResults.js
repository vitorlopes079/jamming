import React from "react";
import "./SearchResults.css";
import Tracklist from "./Tracklist";

function SearchResults(props) {
  const { tracks, onAdd } = props;

  return (
    <div className="SearchResults">
      <Tracklist tracks={tracks || []} add={onAdd} isRemovable={false} />
    </div>
  );
}

export default SearchResults;
