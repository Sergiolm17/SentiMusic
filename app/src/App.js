import React, { useState } from "react";
import "./App.css";
import Card from "./components/card";
import Link from "./components/ahref";
import Title from "./components/title";
import Cover from "./components/cover";
import Emoji from "./components/emoji";
import Who from "./components/who";
import List from "./components/list";

import Domo from "./files/DOMO.svg";
import Logo from "./files/Logo.svg";

import {
  appurl,
  useGetNowPlaying,
  useRecomendation,
  useRecomendationPlus,
  useGetAudio,
  addtoPlaylist,
  useGetPlaylist,
  useCreatePlaylist
} from "./hooks/User";

const imgStyle = {
  margin: "20px"
};
function App() {
  //const [me] = useGetMe();
  const [loggedIn, nowPlaying, current, error] = useGetNowPlaying();
  /// const [devices] = useGetDevice(nowPlaying);
  //const [audiodetail] = useGetAudio(nowPlaying);
  const [state, setState] = useState(0);
  const [Playlist] = useGetPlaylist();

  //const recomendationPlus = useRecomendationPlus(state);
  const [recomendation] = useRecomendation(nowPlaying, state);
  const [playlist_id] = useCreatePlaylist();

  const titlePlaylist = (
    <h2>
      {state === 0
        ? "Playlist automatica"
        : state === 1
        ? "Playlist Feliz"
        : "Modo Sad"}
    </h2>
  );
  /*
  const recomendacionPlus = recomendationPlus.map((music, indexaudio) => (
    <List
      key={music.id}
      artist={music.artists[0].name}
      name={music.name}
      src={music.album.images[0].url}
      preview_url={music.preview_url}
      valence={music.valence}
    />
  ));
*/
  console.log(playlist_id.external_urls);

  if (!loggedIn || error) {
    return (
      <div className="App-header">
        <Card>
          <p>
            <img src={Domo} alt="texto" style={imgStyle}></img>
          </p>
          <p>
            <img src={Logo} alt="Logo Domo" style={imgStyle}></img>
          </p>
          <Link href={appurl} style={imgStyle}>
            Iniciar sesion con spotify
          </Link>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="App-header">
        <Card>
          <h2>¿Como te quieres sentir ?</h2>
          <Emoji onClick={() => setState(1)} state={true}></Emoji>
          <Emoji onClick={() => setState(2)} state={false}></Emoji>
        </Card>
        {state > 0 && (
          <Card normal>
            {titlePlaylist}
            {playlist_id.external_urls && (
              <Link
                href={playlist_id.external_urls.spotify}
                style={imgStyle}
                newtab
              >
                Ir a la playlist creada
              </Link>
            )}
            {recomendation.map((music, indexaudio) => (
              <List
                key={music.id}
                artist={music.artists[0].name}
                name={music.name}
                src={music.album.images[0].url}
                preview_url={music.preview_url}
                valence={music.valence}
                onClick={() => addtoPlaylist(playlist_id.id, music.uri)}
              ></List>
            ))}
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="App-header">
      {nowPlaying.name && loggedIn ? (
        <Title>Ahora reproduciendo</Title>
      ) : (
        <>
          <Card>
            <p className="Title">Ponle play para recomendarte</p>
          </Card>
        </>
      )}
    </div>
  );
}

export default App;
/*
{nowPlaying.name && !current && (
        <Card normal>
          <p className="Title">Ponle play para recomendarte</p>
          <Who
            name={nowPlaying.name}
            artist={`${nowPlaying.artist}  ${audiodetail.valence}`}
          ></Who>
        </Card>
      )}
      {nowPlaying.name && current && (
        <Card normal>
          <Cover nowPlaying={nowPlaying}></Cover>
          <Who
            name={nowPlaying.name}
            artist={`${nowPlaying.artist} ${audiodetail.valence}`}
          ></Who>
        </Card>
      )}
      {nowPlaying.name && (
        <Card>
          <h2>¿Como te quieres sentir ?</h2>
          <Emoji onClick={() => setState(1)} state={true}></Emoji>
          <Emoji onClick={() => setState(2)} state={false}></Emoji>
        </Card>
      )}
*/
/*
 <Card>
        <Slider min={0} max={1} defaultValue={1} handle={handle} step={0.2} />
      </Card>
      <CircularProgressbar
        value={percentage}
        className="progress"
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,

          pathColor: `#F27A54`,
          trailColor: "transparent"
        })}
      ></CircularProgressbar>

        {me.display_name && "hola " + me.display_name}

        {devices.length > 0 &&
          "se encontro " + devices.length + " dispositivos"}
        {devices.map(device => (
          <li key={device.id}>
            {device.name} {device.tylie}
          </li>
        ))}
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
*/
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
