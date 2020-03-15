import { useState, useEffect } from "react";
import { getHashParams, useGetDevice } from "./service";
import { appurl /*, appurl_refresh */ } from "./data";
import SpotifyWebApi from "spotify-web-api-js";
import { getUserData, updateData } from "../services/firebase_service";
import firebase from "../Firebase";
//var querystring = require("querystring");

const spotifyApi = new SpotifyWebApi();

function useAccessToken() {
  const [loggedIn, setloggedIn] = useState(false);
  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user };
  });
  //const [access_token, setaccess_token] = useState("");
  useEffect(() => {
    state.user &&
      firebase
        .database()
        .ref(`/spotifyAccessToken/${state.user.uid}`)
        .once("value")
        .then(function(snapshot) {
          setloggedIn(snapshot.val() ? true : false);
          //setaccess_token(snapshot.val());
          spotifyApi.setAccessToken(snapshot.val());
        });
  }, [state.user]);
  const onChange = user => {
    setState({ initializing: false, user });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return loggedIn;
}
const useGetMe = loggedIn => {
  const [me, setme] = useState({});
  useEffect(() => {
    loggedIn &&
      spotifyApi.getMe().then(user => {
        setme(user);
      });
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
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => getCurrent(), 3000);
    function getCurrent() {
      loggedIn &&
        spotifyApi.getMyCurrentPlaybackState((err, response) => {
          if (err) {
            setError(true);
            clearInterval(interval);
            console.error(err);
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
  }, [loggedIn]);

  return [nowPlaying, error, current];
};

const useRecomendation = (nowPlaying, state, genre) => {
  const [recomendation, setrecomendation] = useState([]);
  const [musicsaved] = useCallsaveData();
  const seed_tracks_fun = () => {
    if (musicsaved.length === 0) return {};
    const seed_tracks_ = `${musicsaved.join(",")}${
      nowPlaying.id ? "," + nowPlaying.id : ""
    }`;
    if (seed_tracks_) return { seed_tracks: seed_tracks_ };
  };
  //console.log(state, genre, nowPlaying.id, musicsaved);
  const genreSwitch = genre => {
    if (genre) return { seed_genres: genre };
    return {};
  };
  const valence = state => {
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
    return {};
  };
  useEffect(() => {
    const finalOptions = {
      ...seed_tracks_fun(),
      //...valence(state),
      ...genreSwitch(genre)
    };
    console.log("reco", finalOptions);

    spotifyApi
      .getRecommendations({
        limit: 10,
        market: "PE",
        //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
        ...finalOptions
        //min_energy: 0.9,
        //popularity: 0.9
      })
      .then(data => {
        console.log(data);

        setrecomendation(data.tracks);
      })
      .catch(e => {
        console.log(e);
      });
  }, [state, musicsaved, nowPlaying.id]);
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
  useCreatePlaylist,
  useCallsaveData
  /*,
  getSearch,
  createPlaylist,
  addToPlaylist,
  removeToPlaylist
  */
};
/*


*/
