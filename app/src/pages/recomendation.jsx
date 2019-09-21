import React from "react";
import Card from "../components/card";
import List from "../components/list";
import Link from "../components/ahref";
import {
  useRecomendation,
  addtoPlaylist,
  useCreatePlaylist
} from "../hooks/User";
const imgStyle = {
  margin: "20px"
};
export default ({ nowPlaying, state }) => {
  const [playlist_id] = useCreatePlaylist();

  const [recomendation] = useRecomendation(nowPlaying, state);

  const titlePlaylist = (
    <h2>
      {state === 0
        ? "Playlist automatica"
        : state === 1
        ? "Playlist Feliz"
        : "Modo Sad"}
    </h2>
  );

  return (
    <Card normal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 40%",
          alignItems: "center"
        }}
      >
        {titlePlaylist}
        {playlist_id.external_urls && (
          <Link href={playlist_id.external_urls.spotify} style={imgStyle}>
            Ir a la playlist creada
          </Link>
        )}
      </div>
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
  );
};
