import React, { useState, useEffect } from "react";
import { genre } from "../hooks/data";
import "./genre.scss";
export default ({ data }) => {
  const [my_Genre, setGenre] = useState([]);
  const [only_one, setOnly_one] = useState(null);
  const addgenre = gen => {
    setOnly_one(gen);
    var found = my_Genre.find(element => element === gen);
    if (!found) setGenre([...my_Genre, gen]);
  };
  /*
  useEffect(() => {
    console.log(my_Genre);
  }, [my_Genre]);
  */
  useEffect(() => {
    data(only_one);
  }, [only_one, data]);
  if (genre.length > 0)
    return (
      <div className={`genre`}>
        {genre.map((gen, id) => (
          <button
            key={id}
            className="genre-button"
            onClick={() => addgenre(gen)}
          >
            {gen}
          </button>
        ))}
      </div>
    );
  else return "";
};
