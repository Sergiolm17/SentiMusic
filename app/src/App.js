import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card";
import Link from "./components/ahref";
import Emoji from "./components/emoji";
/*
import Title from "./components/title";
*/
import Cover from "./components/cover";
import Who from "./components/who";
import Domo from "./files/DOMO.svg";
import Logo from "./files/Logo.svg";
import Recomendation from "./pages/recomendation";
import {
  appurl,
  useGetNowPlaying,
  useAccessToken,
  useGetMe
} from "./hooks/User";
//import RangeSlider from "react-bootstrap-range-slider";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const imgStyle = {
  margin: "20px"
};
function App() {
  //const [playlist_id] = useCreatePlaylist();

  const {
    loggedIn,
    state: { initializing, user }
  } = useAccessToken();
  console.log(loggedIn, initializing, user);

  //const [me] = useGetMe(loggedIn);
  const [nowPlaying] = useGetNowPlaying(loggedIn);
  //const [state, setState] = useState(0);
  const [value, setValue] = useState([0.1]);

  if (!loggedIn) {
    return (
      <div className="App-header">
        <Card>
          <p>
            <img src={Domo} alt="texto" style={imgStyle}></img>
          </p>
          <p>
            <img src={Logo} alt="Logo Domo" style={imgStyle}></img>
          </p>
          {!loggedIn && initializing && (
            <Link href={appurl} newtab style={imgStyle}>
              Iniciar sesion con spotify :)
            </Link>
          )}
        </Card>
      </div>
    );
  }
  return (
    <div className="App-header">
      {nowPlaying.name && (
        <Card normal>
          <Cover
            is_playing={nowPlaying.is_playing}
            nowPlaying={nowPlaying}
          ></Cover>

          <Who name={nowPlaying.name} artist={`${nowPlaying.artist} `}></Who>
        </Card>
      )}
      <Card>
        <h3 style={{ textAlign: "center" }}>Energia</h3>
        <Range
          min={0.1}
          max={0.8}
          step={0.1}
          defaultValue={[0.1]}
          tipFormatter={value => `${value}%`}
          onChange={changeEvent => {
            console.log(changeEvent);
            setValue(changeEvent);
          }}
        />
      </Card>

      <Recomendation nowPlaying={nowPlaying} state={value} />
    </div>
  );
}
/*
          <h3 style={{ textAlign: "left" }}>Ahora reproduciendo:</h3>

<Card normal={!now}>
        {state !== 0 && (
          <Link
            button
            onClick={() => {
              setNow(null);
              setState(0);
            }}
          >
            Volver a escoger
          </Link>
        )}

        {!now ? (
          <>
            <h2>¿Como te sientes ahora?</h2>
            <Emoji onClick={() => setNow(1)} state={1}></Emoji>

            <Emoji onClick={() => setNow(2)} state={2}></Emoji>
          </>
        ) : (
          state === 0 && (
            <>
              <h2>¿Como te quieres sentir ?</h2>
              <Emoji onClick={() => setState(1)} state={1}></Emoji>
              <Emoji onClick={() => setState(3)} state={3}></Emoji>
              <Emoji onClick={() => setState(2)} state={2}></Emoji>
            </>
          )
        )}
      </Card>

{now && state !== 0 && (
        <Recomendation nowPlaying={nowPlaying} state={state} />
      )}
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
*/
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
