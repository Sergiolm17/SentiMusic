import React, { useState, useEffect } from "react";
import { genre } from "../hooks/data";
import "./genre.scss";
import styled from "styled-components";
const Boton = styled.button`
  text-decoration: transparent;
  margin: auto;
  text-rendering: auto;
  color: #ffffff;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  background-color: transparent;
  box-sizing: border-box;
  font-family: Montserrat;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  text-align: center;
  transition: all 1s;
  &:focus {
    background: #ffffff4d;
    outline: none;
  }
  &:hover {
    background: #ffffff23;
    outline: none;
  }
`;
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
          <Boton key={id} onClick={() => addgenre(gen)}>
            {gen}
          </Boton>
        ))}
      </div>
    );
  else return "";
};
