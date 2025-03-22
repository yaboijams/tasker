import React from "react";

const SpotifyWidget = () => {
  return (
    <div className="spotify-widget">
      <iframe
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
        width="100%"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        className="rounded shadow"
      ></iframe>
    </div>
  );
};

export default SpotifyWidget;
