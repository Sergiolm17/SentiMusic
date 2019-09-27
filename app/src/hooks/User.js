import { useState, useEffect } from "react";
import { getHashParams, useGetDevice } from "./service";
import { appurl, appurl_refresh } from "./data";
import SpotifyWebApi from "spotify-web-api-js";
import { getUserData, updateData } from "../services/firebase_service";
//var querystring = require("querystring");

const spotifyApi = new SpotifyWebApi();
var querystring = require("querystring");

function useAccessToken() {
  const params = getHashParams();
  const [loggedIn, setloggedIn] = useState(false);
  const [access_token /*, setaccess_token*/] = useState(
    localStorage.getItem("access_token") || params.access_token || ""
  );
  const [refresh_token /*, setRefresh_token*/] = useState(
    localStorage.getItem("refresh_token") || params.refresh_token || ""
  );

  useEffect(() => {
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }
    setloggedIn(access_token ? true : false);
  }, [access_token, refresh_token]);
  return loggedIn;
}
const useGetMe = () => {
  const [me, setme] = useState({});
  useEffect(() => {
    spotifyApi.getMe().then(user => {
      setme(user);
    });
  }, []);
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
  useEffect(() => {
    getCurrent();
    const interval = setInterval(() => getCurrent(), 3000);
    function getCurrent() {
      if (localStorage.getItem("access_token"))
        spotifyApi.getMyCurrentPlaybackState((err, response) => {
          if (err) {
            //console.log(JSON.parse(err.response).error);
            if (localStorage.getItem("refresh_token"))
              request_refresh(JSON.parse(err.response).error, data => {
                if (data.access_token)
                  spotifyApi.setAccessToken(data.access_token);
                else {
                  setError(true);
                  eliminar();
                  clearInterval(interval);
                }
              });
          } else {
            setError(false);
            setcurrent(response ? response.is_playing : false);
            if (
              response.item &&
              response.currently_playing_type !== "episode"
            ) {
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
  }, []);

  return { nowPlaying, error, current };
};
function request_refresh(error, function_return) {
  const params = getHashParams();

  fetch(
    appurl_refresh +
      querystring.stringify({
        refresh_token:
          localStorage.getItem("refresh_token") || params.refresh_token
      })
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      function_return(data);

      //setaccess_token(data.access_token);
      //localStorage.setItem("access_token", data.access_token);
    }); //localStorage.removeItem("refresh_token");
}
const useRecomendation = (nowPlaying, state, genre) => {
  const [recomendation, setrecomendation] = useState([]);
  const [musicsaved] = useCallsaveData();

  useEffect(() => {
    const genreSwitch = genre => {
      if (genre) return { seed_genres: genre };
      return {};
    };
    const seed_tracks_fun = () => {
      if (musicsaved) {
        if (musicsaved.length === 0) return {};
        const seed_tracks_ = `${musicsaved.join(",")}${
          nowPlaying.id ? "," + nowPlaying.id : ""
        }`;
        if (seed_tracks_) return { seed_tracks: seed_tracks_ };
      }

      return {};
    };

    const valence = state => {
      //if (genreSwitch) return {};
      if (state === 0) return {};
      if (state === 1)
        return {
          min_valence: 0.5
        };
      if (state === 2)
        return {
          max_valence: 0.5
        };
      if (state === 3) return {};
    };

    const finalOptions = {
      ...seed_tracks_fun(),
      ...valence(state),
      ...genreSwitch(genre)
    };
    spotifyApi.getRecommendations(
      {
        limit: 15,
        market: "PE",
        //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
        ...finalOptions
        //min_energy: 0.9,
        //popularity: 0.9
      },
      (err, data) => {
        if (!err) setrecomendation(data.tracks);
      }
    );
  }, [state, genre /*, nowPlaying.id */, musicsaved]);
  return [recomendation];
};
const useCallsaveData = () => {
  const [musicsaved, setmusicsaved] = useState([]);
  useEffect(() => {
    spotifyApi
      .getMySavedTracks({ limit: 4, offset: 0, market: "PE" })
      .then(data => {
        /*
        const parsedata = data.items.map(item => {
          return { added_at: item.added_at, ...item.track };
        });*/
        const newdata = data.items.map(item => item.track.id);
        setmusicsaved(newdata);
      });
  }, []);
  return [musicsaved];
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
      // alert(localStorage.getItem("playlist_id"));
    }
  }, [me.id, playlist]);
  return [exist];
};
const useCreatePlaylist = () => {
  const [me] = useGetMe();
  //const [exist] = useGetPlaylist();

  const [playlist_id, setplaylist_id] = useState(null);
  const [playlist, setplaylist] = useState({});
  useEffect(() => {
    if (playlist_id) localStorage.setItem("playlist_id", playlist_id);
  }, [playlist_id]);
  useEffect(() => {
    if (me) {
      getUserData(me, (data, err) => {
        if (data) {
          if (data.playlist_id) {
            spotifyApi.getPlaylist(data.playlist_id).then(dataGet => {
              if (dataGet.id) {
                setplaylist(dataGet);
                setplaylist_id(dataGet.id);
              } else {
                updateData(me, { playlist_id: "" }, (body, err) =>
                  console.log(body, err)
                );
              }
            });
          } else
            spotifyApi
              .createPlaylist(me.id, {
                name: "Domo Playlist",
                public: false,
                collaborative: false,
                description: "Playlist de musica recomendada"
              })
              .then(device => {
                updateData(me, { playlist_id: device.id }, (body, err) =>
                  console.log(body, err)
                );
                setplaylist_id(device.id);
                setplaylist(device);
              });
        }
      });
    }
  }, [me]);

  /*
  useEffect(() => {
    if (!me.id) return console.log("esperando usuario");

    if (playlist_id)
      spotifyApi.getPlaylist(playlist_id).then(a => {
        console.log(a);
        setplaylist(a);
        setplaylist_id(a.id);
      });
    else
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
  }, [me.id]);
*/
  return [playlist];
};
function addtoPlaylist(playlist_id, uri) {
  console.log(playlist_id, uri);
  spotifyApi.addTracksToPlaylist(playlist_id, [uri]).then(device => {
    console.log(device);
    spotifyApi.play();
    alert("Se añadio con exito");
  });
}
function eliminar() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  //localStorage.removeItem("playlist_id");
  // document.cookie = "playlist_id" + "=; Max-Age=0";
}
/*

function getAudioFeaturesForTrack(data) {
  const tracks = [];
  data.map(track => {
    spotifyApi.getAudioFeaturesForTrack(track.id, (err, audiodetail) => {
      console.log(Object.assign({}, track, audiodetail));
      tracks.push(Object.assign({}, track, audiodetail));
      return Object.assign({}, track, audiodetail);
    });
  });
  
  if (data.length === tracks.length) return tracks;
  else return data;
}
*/
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

export {
  appurl,
  useAccessToken,
  useGetMe,
  useGetNowPlaying,
  useGetDevice,
  useGetAudio,
  useRecomendation,
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
