import { useState, useEffect } from "react";

import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function useAccessToken() {
  const params = getHashParams();

  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
    }

    setloggedIn(params.access_token ? true : false);
  }, [params.access_token]);
  return loggedIn;
}
const useGetMe = () => {
  const loggedIn = useAccessToken();
  const [me, setme] = useState({});
  useEffect(() => {
    if (loggedIn) {
      spotifyApi.getMe().then(user => {
        console.log(user);
        setme(user);
      });
    }
  }, [loggedIn]);
  return [me];
};
const useGetNowPlaying = loggedIn => {
  const [nowPlaying, setnowPlaying] = useState({
    name: "",
    artist: "",
    albumArt: "",
    is_playing: false,
    uri: "",
    id: ""
  });
  const [current, setcurrent] = useState(false);

  useEffect(() => {
    //if (!loggedIn) return null;
    getCurrent();
    const interval = setInterval(() => loggedIn && getCurrent(), 1000);
    function getCurrent() {
      if (loggedIn)
        spotifyApi.getMyCurrentPlaybackState().then(response => {
          setcurrent(response ? response.is_playing : false);

          if (response)
            setnowPlaying({
              name: response.item.name,
              albumArt: response.item.album.images[0].url,
              is_playing: response.is_playing,
              uri: response.item.uri,
              id: response.item.id,
              artist: response.item.artists[0].name
            });
        });
    }
    return () => {
      clearInterval(interval);
    };
  }, [loggedIn]);

  return [nowPlaying, current];
};

const useGetDevice = nowPlaying => {
  const [devices, setdevices] = useState([]);
  useEffect(() => {
    if (nowPlaying.id) {
      spotifyApi.getMyDevices().then(data => setdevices(data.devices));
    }
  }, [nowPlaying.id]);
  return [devices];
};

const useRecomendation = (nowPlaying, state) => {
  const [recomendation, setrecomendation] = useState([]);
  useEffect(() => {
    if (nowPlaying.id)
      spotifyApi
        .getRecommendations({
          limit: 4,
          market: "PE",
          //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_tracks: nowPlaying.id,
          //min_energy: 0.4,
          min_valence: state ? 0.5 : 0,
          max_valence: state ? 1 : 0.5
          //min_popularity: 90
        })
        .then(data => setrecomendation(data.tracks));
  }, [nowPlaying.id, state]);
  return [recomendation];
};
const useGetAudio = nowPlaying => {
  const [audiodetail, setaudiodetail] = useState({});
  useEffect(() => {
    if (nowPlaying.id) {
      spotifyApi
        .getAudioFeaturesForTrack(nowPlaying.id)
        .then(audiodetail => setaudiodetail(audiodetail));
    }
  }, [nowPlaying.id]);
  return [audiodetail];
};
/*
const getSearch = () => {
  spotifyApi.search("WONDERLAND", ["track"], { market: "PE" }).then(device => {
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
*/
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
export {
  useAccessToken,
  useGetMe,
  useGetNowPlaying,
  useGetDevice,
  useRecomendation,
  useGetAudio
  /*,
  getSearch,
  createPlaylist,
  addToPlaylist,
  removeToPlaylist
  */
};
/*


*/
