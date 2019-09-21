import { useState, useEffect } from "react";
import { getHashParams, useGetDevice } from "./service";
import { appurl, appurl_refresh } from "./data";
import SpotifyWebApi from "spotify-web-api-js";
var querystring = require("querystring");

const spotifyApi = new SpotifyWebApi();

function useAccessToken() {
  const params = getHashParams();

  const [loggedIn, setloggedIn] = useState(false);
  const [access_token, setaccess_token] = useState(
    params.access_token || localStorage.getItem("access_token") || ""
  );
  const [refresh_token, setRefresh_token] = useState(
    params.refresh_token || localStorage.getItem("refresh_token") || ""
  );

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    console.log(access_token);

    if (access_token) {
      spotifyApi.setAccessToken(access_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }
    setloggedIn(access_token ? true : false);
  }, [access_token]);
  return loggedIn;
}
const useGetMe = () => {
  const [me, setme] = useState({});
  useEffect(() => {
    spotifyApi.getMe().then(user => {
      //console.log(user);
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
      spotifyApi.getMyCurrentPlaybackState((err, response) => {
        if (err) {
          setError(true);
          clearInterval(interval);
          console.error(err);
        } else {
          setError(false);
          setcurrent(response ? response.is_playing : false);

          if (response.item && response.currently_playing_type !== "episode") {
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

  return [nowPlaying, error, current];
};

const useRecomendation = (nowPlaying, state) => {
  const [recomendation, setrecomendation] = useState([]);
  const [musicsaved] = useCallsaveData();
  let seed_tracks = `${musicsaved.join(",")}${
    nowPlaying.id ? "," + nowPlaying.id : ""
  }`;

  useEffect(() => {
    console.log(musicsaved);
  }, [musicsaved, state]);
  useEffect(() => {
    //console.log(musicsaved.length > 0, state !== 0);

    if (musicsaved.length > 0 && seed_tracks /* && state !== 0*/) {
      spotifyApi
        .getRecommendations({
          limit: 15,
          market: "PE",
          //seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_tracks,

          //min_energy: 0.9,
          min_valence: state === 0 ? 0 : state === 1 ? 0.5 : 0,
          max_valence: state === 0 ? 1 : state === 1 ? 1 : 0.5
          //popularity: 0.9
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
  }, [state, musicsaved.length, seed_tracks /*, nowPlaying.id*/]);
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
  }, [me.id]);
  return [exist];
};
const useCreatePlaylist = () => {
  const [me] = useGetMe();
  const [exist] = useGetPlaylist();
  const [playlist_id, setplaylist_id] = useState({});

  useEffect(() => {
    if ((!me.id && exist !== 2) || exist === 1)
      return console.log("esperando usuario");

    if (localStorage.getItem("playlist_id"))
      spotifyApi
        .getPlaylist(localStorage.getItem("playlist_id"))
        .then(a => setplaylist_id(a));
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
  }, [me.id, exist]);

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
