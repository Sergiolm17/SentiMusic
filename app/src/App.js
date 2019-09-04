import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

function App() {
  const params = getHashParams();
  const [loggedIn, setloggedIn] = useState(false);
  const [devices, setdevices] = useState([]);
  const [me, setme] = useState({});

  const [nowPlaying, setnowPlaying] = useState({
    name: "",
    albumArt: "",
    is_playing: false,
    uri: "",
    id: ""
  });

  useEffect(() => {
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
      getMe();
    }

    setloggedIn(token ? true : false);
  }, [params.access_token]);
  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      console.log(response);
      if (response)
        setnowPlaying({
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          is_playing: response.is_playing,
          uri: response.item.uri,
          id: response.item.id
        });
    });
  };
  const getMe = () => {
    spotifyApi.getMe().then(user => {
      console.log(user);
      setme(user);
    });
  };
  const getDevice = () => {
    spotifyApi.getMyDevices().then(device => {
      console.log(device);

      setdevices(device.devices);
    });
  };
  const getRecomendation = () => {
    if (nowPlaying.id)
      spotifyApi
        .getRecommendations({
          limit: 10,
          market: "PE",
          //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_tracks: nowPlaying.id,
          min_energy: 0.4,
          min_popularity: 50
        })
        .then(device => {
          console.log(device);
        });
  };
  const getAudio = () => {
    if (nowPlaying.id)
      spotifyApi.getAudioFeaturesForTrack(nowPlaying.id).then(device => {
        console.log(device);
      });
  };
  const getSearch = () => {
    spotifyApi
      .search("WONDERLAND", ["track"], { market: "PE" })
      .then(device => {
        console.log(device);
      });
  };
  const createPlaylist = () => {
    spotifyApi
      .createPlaylist(me.id, {
        name: "Creado desde el server",
        public: false,
        description: "esta lpaylist es la recomendada"
      })
      .then(device => {
        console.log(device);
      });
  };
  const addToPlaylist = () => {
    if (nowPlaying.uri)
      spotifyApi
        .addTracksToPlaylist("06sL90oZx5lI8mbaGzlgFD", [nowPlaying.uri])
        .then(device => {
          console.log(device);
        });
  };
  const removeToPlaylist = () => {
    if (nowPlaying.uri)
      spotifyApi
        .removeTracksFromPlaylist("06sL90oZx5lI8mbaGzlgFD", [nowPlaying.uri])
        .then(device => {
          console.log(device);
        });
  };

  return (
    <div>
      {!loggedIn && (
        <a href="https://sentimusic.herokuapp.com/login"> Login to Spotify </a>
      )}
      {me.display_name && "hola " + me.display_name}

      {nowPlaying && (
        <div>
          Ahora reproduciendo: {nowPlaying.name}
          <img
            alt={nowPlaying.name}
            src={nowPlaying.albumArt}
            style={{ height: 150 }}
          />
        </div>
      )}
      {loggedIn && (
        <>
          <button onClick={() => getNowPlaying()}>Ahora reproduciendo</button>
          <button onClick={() => getDevice()}>Get Device</button>
          <button onClick={() => getSearch()}>Search</button>
          <button onClick={() => createPlaylist()}>createPlaylist</button>
        </>
      )}
      {nowPlaying.uri && (
        <>
          <button onClick={() => getRecomendation()}>Get Recomendacion</button>
          <button onClick={() => getAudio()}>getAudio</button>
          <button onClick={() => addToPlaylist()}>addToPlaylist</button>
          <button onClick={() => removeToPlaylist()}>removeToPlaylist</button>
        </>
      )}
      <p>
        {devices.length > 0 &&
          "se encontro " + devices.length + " dispositivos"}
      </p>
      {devices.map(device => (
        <p key={device.id}>
          {device.name} {device.type}
        </p>
      ))}
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
