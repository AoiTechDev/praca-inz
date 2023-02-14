import axios from "axios";
import React, { useState, useEffect } from "react";
import "./app.css";
import Search from "./components/Search";

import Slider from "./components/Slider";
//import Character from './components/Character';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Find } from "./components/small_components/Find";
//import { useOutletContext } from "react-router-dom";

function App() {
  const [data, setData] = useState({});
  const [guildData, setGuildData] = useState({});
  const [formData, setFormData] = useState({
    Nickname: " ",
    Guild: " ",
    Server: " ",
    GuildServer: " ",
  });
  //const [guildMember, setGuildMember] = useState({})
  const [isFetch, setIsFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [guildFetch, setGuildFetch] = useState(false);
  //const [test, setTest] = useState(false);
  const [achivSubCategory, setAchivSubCategory] = useState({});
  const [responseStatus, setResponseStatus] = useState(0);
  const [petData, setPetData] = useState({});
  const [fetchPetsData, setFetchPetsData] = useState(false);
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  useEffect(() => {
    if (responseStatus === 200) {
      setIsFetch(true);
      navigate("/");
    } else if (responseStatus === 404) {
      setIsFetch(false);
    }
  }, [responseStatus]);

  async function getPets() {
    const url = "http://localhost:9000/pets";
    await axios
      .get(url, {
        params: {
          nickname: formData.Nickname.toLowerCase(),
          server: formData.Server.toLowerCase(),
        },
      })
      .then((res) => {
        setPetData(res.data);
        setFetchPetsData(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setResponseStatus(err.response.status);
      });
  }

  async function getPlayer() {
    setFetchPetsData(false);
    setLoading(true);
    const url = "http://localhost:9000/character";
    await axios
      .get(url, {
        params: {
          nickname: formData.Nickname.toLowerCase(),
          server: formData.Server.toLowerCase(),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setResponseStatus(res.status);
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setResponseStatus(err.response.status);
        setLoading(false);
      });
    setSearchState("character");
    setLoading(false);
  }
  async function getGuild() {
    setLoading(true);
    const url = "http://localhost:9000/guild";
    await axios
      .get(url, {
        params: {
          guild: formData.Guild.toLowerCase(),
          server: formData.GuildServer.toLowerCase(),
        },
      })
      .then((res) => setGuildData(res.data))
      .catch((err) => {
        setLoading(false);
        console.error(err.data);
      });
    setIsFetch(true);
    setLoading(false);
    setSearchState("guild");
    setGuildFetch(true);
  }

  async function getSubCategory(e) {
    //setLoading(true);
    const url = "http://localhost:9000/achiv_sub_category";
    await axios
      .get(url, {
        params: {
          id: e.id,
        },
      })
      .then((res) => setAchivSubCategory(res.data))
      .catch((err) => console.log(err));
    //setLoading(false);
  }

  function getGuildMember(nick) {
    setFormData((prev) => ({
      ...prev,
      Nickname: nick.toLowerCase(),
    }));
    // setTest(prev => !prev)
    console.log("run");
  }

  const handleMouseLeave = (key) => {
    const item = document.getElementsByClassName("item")[key];
    item.style.boxShadow = "";
  };
  console.log(guildData);
  return (
    <div
      className="app"
      style={{
        backgroundColor: "rgb(56,31,37)",
      }}
    >
      <main
        style={{
          backgroundImage: isFetch && "url(hall3.jpg)",
        }}
      >
        {/* <div
          className="bg"
          style={{
            backgroundImage: isFetch && "url(hall3.jpg)",
          }}
        ></div> */}
        {!isFetch && (
          <div className="find-container">
            <div className="find-player find-half-container">
              <Find
                label={"Nickname"}
                name={"Nickname"}
                state={"Player"}
                server={"Server"}
                getFun={getPlayer}
                handleChange={handleChange}
                formData={formData}
                value={formData.Nickname}
                Link={Link}
              />
            </div>
            <div className="find-guild find-half-container">
              <Find
                label={"Guild"}
                name={"Guild"}
                state={"Guild"}
                server={"GuildServer"}
                getFun={getGuild}
                handleChange={handleChange}
                formData={formData}
                value={formData.Guild}
                Link={Link}
              />
            </div>
          </div>
        )}
        {isFetch && (
          <div className="nav-bar">
            <div className="nav-btn-container">
              <Link to="/" className="nav-btn-link">
                <div className="nav-btn"> Character</div>
              </Link>
              <Link to="guild" className="nav-btn-link">
                <div className="nav-btn">Guild</div>
              </Link>
            </div>
            <div className="nav-search">
              {searchState === "guild" ? (
                <Find
                  label={"Guild"}
                  name={"Guild"}
                  state={"Guild"}
                  server={"GuildServer"}
                  getFun={getGuild}
                  handleChange={handleChange}
                  formData={formData}
                  value={formData.Guild}
                  Link={Link}
                  isFetch={isFetch}
                />
              ) : (
                <Find
                  label={"Nickname"}
                  name={"Nickname"}
                  state={"Player"}
                  server={"Server"}
                  getFun={getPlayer}
                  handleChange={handleChange}
                  formData={formData}
                  value={formData.Nickname}
                  Link={Link}
                  isFetch={isFetch}
                />
              )}
            </div>
          </div>
        )}
        {/* <Search
          handleChange={handleChange}
          getPlayer={getPlayer}
          isFetch={isFetch}
          Link={Link}
          searchState={searchState}
          setSeatchState={setSeatchState}
          getGuild={getGuild}
          formData={formData}
        /> */}
        {responseStatus === 404 && <div>no character</div>}
        {isFetch && (
          //<Character data={data} isFetch={isFetch} handleMouseLeave={handleMouseLeave}/>
          <Outlet
            context={{
              data: data,
              isFetch: isFetch,
              handleMouseLeave: handleMouseLeave,
              getSubCategory: getSubCategory,
              achivSubCategory: achivSubCategory,
              guildData: guildData,
              guildFetch: guildFetch,
              getGuildMember: getGuildMember,
              getPlayer: getPlayer,
              responseStatus: responseStatus,
              getPets: getPets,
              fetchPetsData: fetchPetsData,
              petData: petData,

              //test: test
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
