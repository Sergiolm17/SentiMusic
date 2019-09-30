import React, { Suspense, lazy } from "react";
import "./App.css";

/*
import Title from "./components/title";
*/
import Login from "./pages/login";
import { useGetNowPlaying, useAccessToken } from "./hooks/User";

const Content = lazy(() => import("./pages/content"));


function App() {
  const loggedIn = useAccessToken();
  const { error ,nowPlaying} = useGetNowPlaying();

  //const [playlist_id] = useCreatePlaylist();

  /// const [devices] = useGetDevice(nowPlaying);
  //const [audiodetail] = useGetAudio(nowPlaying);

  //const recomendationPlus = useRecomendationPlus(state);

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
  console.log(!loggedIn, error);
  */

  if (!loggedIn || error) {
    return <Login />;
  }
  return (
    <Suspense fallback={<></>}>
      <Content nowPlaying={nowPlaying}/>
    </Suspense>
  );
}
export default App;
/*
const url = 'https://www.spotify.com/logout/'                                                                                                                                                                                                                                                                               
const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')                                                                                                
setTimeout(() => spotifyLogoutWindow.close(), 2000)

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
