import React, { useState } from "react";
import Card from "../components/card";
import List from "../components/list";
import Link from "../components/ahref";
//import Genre from "../components/genre";

import {
  useRecomendation,
  addtoPlaylist,
  useCreatePlaylist,
  useCallsaveData
} from "../hooks/User";
const imgStyle = {
  margin: "20px"
};
export default ({ nowPlaying, state }) => {
  const [playlist_id] = useCreatePlaylist();
  const [genre_re, setGenre] = useState(null);

  const [recomendation] = useRecomendation(nowPlaying, state, genre_re);

  const title = state => {
    if (state === 0) return "Playlist automatica";
    if (state === 1) return "Playlist Feliz";
    if (state === 2) return "Modo Sad";
    if (state === 3) return "Modo Cool";
    return "Me buggie";
  };

  const titlePlaylist = <h2>{title(state)}</h2>;
  return (
    <Card normal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 40%",
          alignItems: "center"
        }}
      >
        {/*titlePlaylist*/}
        {playlist_id.external_urls && (
          <Link href={playlist_id.external_urls.spotify} style={imgStyle}>
            Ir a la playlist creada
          </Link>
        )}
      </div>
      {recomendation.map((music, indexaudio) => (
        <div key={indexaudio}>
          {music.album.images[0].url && (
            <List
              key={music.id}
              artist={music.artists[0].name}
              name={music.name}
              src={music.album.images ? music.album.images[0].url : ""}
              preview_url={music.preview_url}
              valence={music.valence}
              onClick={() => addtoPlaylist(playlist_id.id, music.uri)}
              external_urls={music.external_urls.spotify}
            />
          )}
        </div>
      ))}
    </Card>
  );
};
/*
 <Genre
        data={genre => {
          if (genre !== genre_re) {
            setGenre(genre);
            console.log(genre);
          }
        }}
      />

*/
