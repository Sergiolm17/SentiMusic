import React from 'react'
import Domo from "../files/DOMO.svg";
import Logo from "../files/Logo.svg";
import Card from "../components/card";
import Link from "../components/ahref";
import { appurl } from "../hooks/data";

const imgStyle = {
    margin: "20px"
  };
export default () => {
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
  )
}
