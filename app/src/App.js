import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

function App() {
  const [params, setparams] = useState(getHashParams());
  const [loggedIn, setloggedIn] = useState(false);
  const [nowPlaying, setnowPlaying] = useState({
    name: "Not Checked",
    albumArt: ""
  });

  useEffect(() => {
    const token = params.access_token;
    console.log(token);

    if (token) {
      spotifyApi.setAccessToken(token);
    }
    setloggedIn(token ? true : false);
  }, [params.access_token]);
  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      console.log(response);

      setnowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      });
    });
  };
  return (
    <div>
      {loggedIn ? (
        "se conecto tu cuenta de spotify con exito"
      ) : (
        <a href="http://34.68.6.184:4001/login"> Login to Spotify </a>
      )}
      <div>
        <img src={nowPlaying.albumArt} style={{ height: 150 }} />
      </div>
      {loggedIn && (
        <button onClick={() => getNowPlaying()}>Check Now Playing</button>
      )}
    </div>
  );
}
const getHashParams = () => {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
};
export default App;
