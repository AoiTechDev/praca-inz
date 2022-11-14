import axios from "axios";
import React, { useState, useEffect } from "react";
import "./app.css";
import Search from "./components/Search";

import Slider from "./components/Slider";
//import Character from './components/Character';
import { Outlet, Link, useNavigate } from "react-router-dom";
//import { useOutletContext } from "react-router-dom";

function App() {
  const [data, setData] = useState({});
  const [guildData, setGuildData] = useState({});
  const [formData, setFormData] = useState({
    Nickname: " ",
    Guildname: " ",
    Server: " ",
  });
  //const [guildMember, setGuildMember] = useState({})
  const [isFetch, setIsFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchState, setSeatchState] = useState("character");
  const [guildFetch, setGuildFetch] = useState(false);
  const [test, setTest] = useState(false);
  const navigate = useNavigate();
  
  function handleChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  console.log(test)
  async function getPlayer() {
    setLoading(true);
    const url = "http://localhost:9000/character";
    await axios
      .get(url, {
        params: { nickname: formData.Nickname.toLowerCase(), server: formData.Server.toLowerCase() },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    setIsFetch(true);

    setLoading(false);
    navigate("/");
  }


  function getGuildMember(nick){
    setFormData(prev => ({
      ...prev,
      Nickname: nick.toLowerCase()
    }))
    setTest(prev => !prev)
    console.log('run')
  }


  async function getGuild() {
    setLoading(true);
    const url = "http://localhost:9000/guild";
    await axios
      .get(url, {
        params: { guildname: formData.Guildname.toLowerCase(), server: formData.Server.toLowerCase() },
      })
      .then((res) => setGuildData(res.data))
      .catch((err) => console.error(err.data));
    setIsFetch(true);
    setLoading(false);
    setGuildFetch(true);
  }

  function offset(el) {
    var rect = el.getBoundingClientRect();
    return rect;
  }

  

  useEffect(() => {
    const e = document.getElementsByClassName("item-info");

    for (let i = 0; i < e.length; i++) {
      if (offset(e[i]).top > 400) {
        e[i].style.top = "-300px";
      }
      if (offset(e[i]).top > 600) {
        e[i].style.top = "-400px";
      }
    }




  });

  const handleMouseLeave = (key) => {
    const item = document.getElementsByClassName("item")[key];
    item.style.boxShadow = "";
  };
  console.log(formData)
  return (
    <div
      className="app"
      style={{
        backgroundColor: "rgb(56,31,37)",
      }}
    >
      <main
      // style={{
      //   backgroundImage: isFetch && "url(hall3.jpg)",
      // }}
      >
        <div
          className="bg"
          style={{
            backgroundImage: isFetch && "url(hall3.jpg)",
          }}
        ></div>
        <Search
          handleChange={handleChange}
          getPlayer={getPlayer}
          isFetch={isFetch}
          Link={Link}
          searchState={searchState}
          setSeatchState={setSeatchState}
          getGuild={getGuild}
          formData={formData}
        />

        {isFetch && (
          //<Character data={data} isFetch={isFetch} handleMouseLeave={handleMouseLeave}/>
          <Outlet
            context={{
              data: data,
              isFetch: isFetch,
              handleMouseLeave: handleMouseLeave,
              guildData: guildData,
              guildFetch: guildFetch,
              getGuildMember: getGuildMember,
              getPlayer: getPlayer,
              test: test
              //guildMember: guildMember
            }}
          />
        )}
        {/* {isFetch && <div className="talents">s</div>} */}
        {loading && <Slider />}
      </main>
    </div>
  );
}

export default App;
