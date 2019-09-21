import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

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
const useGetDevice = nowPlaying => {
  const [devices, setdevices] = useState([]);
  useEffect(() => {
    if (nowPlaying.id) {
      spotifyApi.getMyDevices().then(data => setdevices(data.devices));
    }
  }, [nowPlaying.id]);
  return [devices];
};

export { getHashParams, useGetDevice };
