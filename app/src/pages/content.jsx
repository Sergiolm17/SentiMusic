import React, { useState, useEffect, Suspense, lazy } from "react";
import { useGetNowPlaying, useGetMe } from "../hooks/User";
import { PostTransition } from "../services/firebase_service";
import Emoji from "../components/emoji";
import Card from "../components/card";
import Link from "../components/ahref";
import Cover from "../components/cover";
import Who from "../components/who";
const Recomendation = lazy(() => import("./recomendation"));

export default ({nowPlaying}) => {
  const [state, setState] = useState(0);
  const [now, setNow] = useState(null);
  //const { nowPlaying } = useGetNowPlaying();
  const [me] = useGetMe();

  useEffect(() => {
    if (!now || state === 0) {
      //console.log(!now || state === 0);
    } else if (me) {
      PostTransition(me, now, state);
      //console.log(me);
    }
  }, [now, state, me]);
  return (
    <div className="App-header">
      {nowPlaying.name && (
        <Card normal>
          <h3 style={{ textAlign: "left" }}>Ahora reproduciendo:</h3>
          <Cover
            is_playing={nowPlaying.is_playing}
            nowPlaying={nowPlaying}
          ></Cover>

          <Who name={nowPlaying.name} artist={`${nowPlaying.artist} `}></Who>
        </Card>
      )}
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
        <Suspense fallback={<></>}>
          <Recomendation nowPlaying={nowPlaying} state={state} />
        </Suspense>
      )}
    </div>
  );
};
