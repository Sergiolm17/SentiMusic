import React, { useState } from "react";
import "./App.css";
import Card from "./components/card";
import Link from "./components/ahref";
import Title from "./components/title";
import Cover from "./components/cover";
import Emoji from "./components/emoji";
import Who from "./components/who";
import List from "./components/list";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import Domo from "./files/DOMO.svg";
import Logo from "./files/Logo.svg";

import {
  appurl,
  useAccessToken,
  useGetMe,
  useGetNowPlaying,
  useGetDevice,
  useRecomendation,
  useRecomendationPlus,
  useGetAudio /*
  ,
  getRecomendation,
  getAudio,
  getSearch,
  createPlaylist,
  addToPlaylist,
  removeToPlaylist*/
} from "./hooks/User";
import Slider, { Range } from "rc-slider";
import Tooltip from "rc-tooltip";

import "rc-slider/assets/index.css";
const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};
const percentage = 50;

const imgStyle = {
  margin: "20px"
};
function App() {
  //const [me] = useGetMe();
  const [loggedIn, nowPlaying, current, error] = useGetNowPlaying();
  // const [devices] = useGetDevice(nowPlaying);
  const [audiodetail] = useGetAudio(nowPlaying);
  const [state, setState] = useState(0);
  const [recomendation] = useRecomendation(nowPlaying, state);
  const [recomendationPlus] = useRecomendationPlus(error);

  if (!loggedIn || error)
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
  return (
    <div className="App-header">
      {loggedIn && <Title>Ahora reproduciendo</Title>}
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
      <Card>
        <Emoji onClick={() => setState(1)} state={true}></Emoji>
        <Emoji onClick={() => setState(2)} state={false}></Emoji>
      </Card>
      {state === 0 && (
        <Card normal>
          {recomendationPlus.map((music, indexaudio) => (
            <List
              key={music.id}
              artist={music.artists[0].name}
              name={music.name}
              src={music.album.images[0].url}
              preview_url={music.preview_url}
              valence={music.valence}
            ></List>
          ))}
        </Card>
      )}
      {state > 0 && (
        <Card normal>
          {recomendation.map((music, indexaudio) => (
            <List
              key={music.id}
              artist={music.artists[0].name}
              name={music.name}
              src={music.album.images[0].url}
              preview_url={music.preview_url}
              valence={music.valence}
            ></List>
          ))}
        </Card>
      )}
    </div>
  );
}

export default App;
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
