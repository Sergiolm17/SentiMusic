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
  }, [access_token, error]);
  useEffect(() => {
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
    }
    setloggedIn(access_token ? true : false);
  }, [access_token]);
  return loggedIn;
}
const useGetMe = data => {
  const loggedIn = useAccessToken();

  const [me, setme] = useState({});
  useEffect(() => {
    if (loggedIn) {
      spotifyApi.getMe().then(user => {
        //console.log(user);
        setme(user);
      });
    }
  }, [loggedIn]);
  return [me];
};
const useGetNowPlaying = () => {
  const [idcurrent, setidcurrent] = useState(null);
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

  useEffect(() => {
    //if (!loggedIn) return null;
    getCurrent();
    const interval = setInterval(() => loggedIn && getCurrent(), 3000);
    function getCurrent() {
      if (loggedIn)
        spotifyApi.getMyCurrentPlaybackState((err, response) => {
          if (err) {
            setError(true);
            console.error(err);
          } else {
            setcurrent(response ? response.is_playing : false);
            setError(false);

            if (response && response.currently_playing_type !== "episode") {
              setnowPlaying({
                name: response.item.name,
                albumArt: response.item.album.images[0].url,
                is_playing: response.is_playing,
                uri: response.item.uri,
                id: response.item.id,
                artist: response.item.artists[0].name
              });
            }
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
  const [musicsaved] = useCallsaveData([]);
  useEffect(() => {
    const seed_tracks = `${
      nowPlaying.id ? nowPlaying.id + "," : ""
    }${musicsaved.join(",")}`;
    if (musicsaved.length > 0 && state !== 0) {
      spotifyApi
        .getRecommendations({
          limit: 4,
          market: "PE",
          //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_tracks,

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
  }, [state /*, nowPlaying.id*/]);
  return [recomendation];
};
const useCallsaveData = () => {
  const [musicsaved, setmusicsaved] = useState([]);
  useEffect(() => {
    spotifyApi
      .getMySavedTracks({ limit: 4, offset: 0, market: "PE" })
      .then(data => {
        const parsedata = data.items.map(item => {
          return { added_at: item.added_at, ...item.track };
        });
        const newdata = data.items.map(item => item.track.id);
        setmusicsaved(newdata);
      });
  }, []);
  return [musicsaved];
};

const useRecomendationPlus = state => {
  const [recomendationPlus, setrecomendationPlus] = useState([]);
  const [musicsaved] = useCallsaveData();
  useEffect(() => {
    if (state !== 0) {
      spotifyApi
        .getRecommendations({
          limit: 4,
          market: "PE",
          //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_tracks: musicsaved.join(","),
          market: "PE"
          //min_energy: 0.4,
          //min_valence: state ? 0.5 : 0,
          //max_valence: state ? 1 : 0.5
          //min_popularity: 90
        })
        .then(data => {
          let tracks = [];
          data.tracks.map(track => {
            spotifyApi.getAudioFeaturesForTrack(track.id).then(audiodetail => {
              const allRules = Object.assign({}, track, audiodetail);

              tracks.push(allRules);
            });
          });
          setrecomendationPlus(tracks);
        });
    }
  }, []);
  return recomendationPlus;
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
const useGetPlaylist = () => {
  const [me] = useGetMe();
  const [playlist, setplaylist] = useState([]);
  const [exist, setexist] = useState(0);
  useEffect(() => {
    if (me) {
      spotifyApi.getUserPlaylists(me.id, { limit: 50 }).then(device => {
        setplaylist(device.items);
      });
    }
  }, [me]);
  useEffect(() => {
    if (playlist.length > 0) {
      var read_cookies = document.cookie;
      var split_read_cookie = read_cookies.split(";");
      var parse = split_read_cookie.map(a => {
        let dat = a.split("=");
        return { name: dat[0], data: dat[1] };
      });
      let cock_playlist = parse.find(o => o.name === " playlist_id");

      let obj = playlist.find(o => o.name === "Domo Playlist");
      setexist(obj ? 1 : 2);
      if (obj) localStorage.setItem("playlist_id", obj.id);
      if (cock_playlist)
        localStorage.setItem("playlist_id", cock_playlist.data);
    }
    //console.log(playlist);
  }, [playlist]);
  return [me, exist];
};
const useCreatePlaylist = () => {
  const [me, exist] = useGetPlaylist();
  const [playlist_id, setplaylist_id] = useState({});
  useEffect(() => {
    if (!me.id && exist !== 2) return console.log("esperando usuario");
    if (exist === 1) console.log("se detecto la playlist");

    if (localStorage.getItem("playlist_id")) {
      spotifyApi
        .getPlaylist(localStorage.getItem("playlist_id"))
        .then(a => setplaylist_id(a));
      return console.log("existe una playlist en local");
    }
    spotifyApi
      .createPlaylist(me.id, {
        name: "Domo Playlist",
        public: false,
        collaborative: true,
        description: "Playlist de musica Recomendada"
      })
      .then(device => {
        localStorage.setItem("playlist_id", device.id);
        setplaylist_id(device);
      });
  }, [me, exist]);
  return [playlist_id];
};
function addtoPlaylist(playlist_id, uri) {
  console.log(playlist_id, uri);
  spotifyApi.addTracksToPlaylist(playlist_id, [uri]).then(device => {
    console.log(device);
    spotifyApi.play();
    alert("Se añadio con exito");
  });
}
function salir(params) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("playlist_id");
  document.cookie = "playlist_id" + "=; Max-Age=0";
}
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
  useRecomendationPlus,
  addtoPlaylist,
  useGetPlaylist,
  useCreatePlaylist
  /*,
  getSearch,
  createPlaylist,
  addToPlaylist,
  removeToPlaylist
  */
};
/*


*/
