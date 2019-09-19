import { useState, useEffect } from "react";

import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
const urllocal = "http://34.68.6.184:4001";
const urlprod = "https://sentimusic.herokuapp.com";

let appurl =
  process.env.NODE_ENV === "production"
    ? urlprod + "/login"
    : urllocal + "/login";
let appurl_refresh =
  process.env.NODE_ENV === "production"
    ? urlprod + "/refresh_token"
    : urllocal + "/refresh_token";
var querystring = require("querystring");

function useAccessToken(error) {
  const params = getHashParams();

  const [loggedIn, setloggedIn] = useState(false);
  const [access_token, setaccess_token] = useState(
    params.access_token || localStorage.getItem("access_token")
  );
  const [refresh_token, setRefresh_token] = useState(
    params.refresh_token || localStorage.getItem("refresh_token")
  );
  useEffect(() => {
    if (error) {
      setaccess_token(null);
      localStorage.removeItem("access_token");
      console.log(refresh_token);

      if (refresh_token)
        fetch(
          appurl_refresh +
            querystring.stringify({
              refresh_token
            })
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setaccess_token(data.access_token);
          }); //localStorage.removeItem("refresh_token");
    } else {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      //const access_token_local = localStorage.getItem("access_token");
      //setaccess_token(access_token);
    }
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
    }

    setloggedIn(access_token ? true : false);
  }, [access_token, error]);
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
const useGetNowPlaying = () => {
  const [nowPlaying, setnowPlaying] = useState({
    name: "",
    artist: "",
    albumArt: "",
    is_playing: false,
    uri: "",
    id: ""
  });
  const [current, setcurrent] = useState(false);
  const [error, setError] = useState(false);

  const loggedIn = useAccessToken(error);
  const [gola] = useGetMe();
  console.log(gola);

  useEffect(() => {
    //if (!loggedIn) return null;
    getCurrent();
    const interval = setInterval(() => loggedIn && getCurrent(), 1000);
    function getCurrent() {
      if (loggedIn)
        spotifyApi.getMyCurrentPlaybackState((err, response) => {
          if (err) {
            setError(true);
            console.error(err);
          } else {
            setcurrent(response ? response.is_playing : false);
            setError(false);
            if (response && response.currently_playing_type !== "episode")
              setnowPlaying({
                name: response.item.name,
                albumArt: response.item.album.images[0].url,
                is_playing: response.is_playing,
                uri: response.item.uri,
                id: response.item.id,
                artist: response.item.artists[0].name
              });
          }
        });
    }
    return () => {
      clearInterval(interval);
    };
  }, [loggedIn]);

  return [loggedIn, nowPlaying, current, error];
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
    if (nowPlaying.id && state !== 0) {
      console.log(state, "state");

      spotifyApi
        .getRecommendations({
          limit: 4,
          market: "PE",
          //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_tracks: nowPlaying.id,
          //min_energy: 0.4,
          min_valence: state === 1 ? 0.5 : 0,
          max_valence: state === 1 ? 1 : 0.5
          //min_popularity: 90
        })
        .then(data => {
          const tracks = [];
          data.tracks.map(track => {
            spotifyApi.getAudioFeaturesForTrack(track.id).then(audiodetail => {
              track = { ...track, ...audiodetail };
              tracks.push(track);
            });
          });
          setrecomendation(tracks);
        });
    }
  }, [nowPlaying.id, state]);
  return [recomendation];
};
const useRecomendationPlus = error => {
  const [recomendation, setrecomendation] = useState([]);
  const [sentiment, setsentiment] = useState([]);

  useEffect(() => {
    if (!error) {
      spotifyApi.getMySavedTracks({ limit: 5, offset: 0 }).then(data => {
        const newdata = data.items.map(item => item.track.id);

        spotifyApi
          .getRecommendations({
            limit: 4,
            market: "PE",
            //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
            seed_tracks: newdata.join(","),
            market: "PE"
            //min_energy: 0.4,
            //min_valence: state ? 0.5 : 0,
            //max_valence: state ? 1 : 0.5
            //min_popularity: 90
          })
          .then(data => {
            const tracks = [];
            data.tracks.map(track => {
              spotifyApi
                .getAudioFeaturesForTrack(track.id)
                .then(audiodetail => {
                  track = { ...track, ...audiodetail };
                  tracks.push(track);
                });
            });
            setrecomendation(tracks);
          });
      });
    }
  }, []);
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
  appurl,
  useAccessToken,
  useGetMe,
  useGetNowPlaying,
  useGetDevice,
  useGetAudio,
  useRecomendation,
  useRecomendationPlus
  /*,
  getSearch,
  createPlaylist,
  addToPlaylist,
  removeToPlaylist
  */
};
/*


*/
