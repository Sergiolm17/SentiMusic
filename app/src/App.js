import React from "react";

import {
  useAccessToken,
  useGetMe,
  useGetNowPlaying,
  useGetDevice,
  useRecomendation,
  useGetAudio /*
  ,
  getRecomendation,
  getAudio,
  getSearch,
  createPlaylist,
  addToPlaylist,
  removeToPlaylist*/
} from "./hooks/User";

const urllocal = "http://34.68.6.184:4001";
const urlprod = "https://sentimusic.herokuapp.com";
let appurl =
  process.env.NODE_ENV === "production"
    ? urlprod + "/login"
    : urllocal + "/login";

function App() {
  const loggedIn = useAccessToken();
  const [me] = useGetMe();
  const [nowPlaying, current] = useGetNowPlaying();
  const [devices] = useGetDevice(nowPlaying);
  const [audiodetail] = useGetAudio(nowPlaying);
  const [recomendation] = useRecomendation(nowPlaying);

  return (
    <div>
      {!loggedIn && <a href={appurl}> Login to Spotify </a>}
      {me.display_name && "hola " + me.display_name}
      {nowPlaying.name && current && (
        <div>
          <p>Ahora reproduciendo: {nowPlaying.name}</p>
          <img
            alt={nowPlaying.name}
            src={nowPlaying.albumArt}
            style={{ height: 300 }}
          />
          <p>acousticness- {audiodetail.acousticness}</p>

          <p>danceability- {audiodetail.danceability}</p>
          <p>duration_ms- {audiodetail.duration_ms}</p>
          <p>energy- {audiodetail.energy}</p>
          <p>instrumentalness- {audiodetail.instrumentalness}</p>
          <p>key- {audiodetail.key}</p>
          <p>liveness- {audiodetail.liveness}</p>
          <p>loudness- {audiodetail.loudness}</p>
          <p>duration_ms- {audiodetail.duration_ms}</p>
          <p>mode- {audiodetail.mode}</p>
          <p>speechiness- {audiodetail.speechiness}</p>
          <p>tempo- {audiodetail.tempo}</p>
          <p>time_signature- {audiodetail.time_signature}</p>
          <p>valence- {audiodetail.valence}</p>
        </div>
      )}
      <p>
        {devices.length > 0 &&
          "se encontro " + devices.length + " dispositivos"}
        {devices.map(device => (
          <li key={device.id}>
            {device.name} {device.tylie}
          </li>
        ))}
      </p>
      Recomendaciones
      {recomendation.map((music, indexaudio) => (
        <div key={music.id}>
          <p>
            {music.artists[0].name}-{music.name}
          </p>
          <img
            alt={music.name}
            src={music.album.images[0].url}
            style={{ height: 100 }}
          />
          <audio controls src={music.preview_url} preload="none">
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      ))}
    </div>
  );
}

export default App;
/*

     
      {loggedIn && (
        <>
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
     
      {devices.map(device => (
        <p key={device.id}>
          {device.name} {device.type}
        </p>
      ))}
*/
