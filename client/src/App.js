import axios from "axios";
import React, { useState, useEffect } from "react";
import "./app.css";
import Search from "./components/Search";

import Slider from "./components/Slider";

import { Outlet, Link, useNavigate } from "react-router-dom";
import { Find } from "./components/small_components/Find";
import { NavBar } from "./components/medium_components/NavBar";

function App() {
  const [data, setData] = useState({});
  const [guildData, setGuildData] = useState({});
  const [tmpGuildData, setTmpGuildData] = useState({});
  const [formData, setFormData] = useState({
    Nickname: "",
    Guild: "",
    Server: "",
    GuildServer: "",
  });

  const [isFetch, setIsFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [mainCharacterData, setMainCharacterData] = useState({});
  const [tmpCharacterData, setTmpCharacterData] = useState({});
  const [isCharacterSearched, setIsCharacterSearched] = useState(false);
  const [isGuildSearched, setIsGuildSearched] = useState(false);
  const [achivsData, setAchivData] = useState({});
  const [guildFetch, setGuildFetch] = useState(false);

  const [achivSubCategory, setAchivSubCategory] = useState({});
  const [responseStatus, setResponseStatus] = useState(0);
  const [mainResponseStatus, setMainResponseStatus] = useState(0);
  const [petData, setPetData] = useState({});
  const [fetchPetsData, setFetchPetsData] = useState(false);
  const [restDataLoading, setRestDataLoading] = useState(false);
  const [tmpCharacter, setTmpCharacter] = useState({
    Nickname: "",
    Server: "",
  });
  const [talentsData, setTalentsData] = useState({});
  const [talentsLoader, setTalentsLoader] = useState(false);
  const [achievementsData, setAchievementsData] = useState({});
  const [achievementsLoader, setAchievementsLoader] = useState(false);
  const [dungeonsData, setDungeonsData] = useState({});
  const [dungeonsLoader, setDungeonsLoader] = useState(false);
  const [raidsData, setRaidsData] = useState({});
  const [raidsLoader, setRaidsLoader] = useState(false);
  const [mountsData, setMountsData] = useState({});
  const [mountsLoader, setMountsLoader] = useState(false);

  const [collectionState, setCollectionState] = useState("mounts");
  const [petLoader, setPetLoader] = useState(false);
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const CollectionState = {
    collectionState: collectionState,
    collectionSet: setCollectionState,
  };

  const ObjectsNLoaders = {
    talents: {
      talentsData: talentsData,
      talentsLoader: talentsLoader,
    },
    achievements: {
      achievementsData: achievementsData,
      achievementsLoader: achievementsLoader,
    },
    dungeons: {
      dungeonsData: dungeonsData,
      dungeonsLoader: dungeonsLoader,
    },
    raids: {
      raidsData: raidsData,
      raidsLoader: raidsLoader,
    },
    mounts: {
      mountsData: mountsData,
      mountsLoader: mountsLoader,
    },
    pets: {
      petLoader: petLoader,
      setPetLoader: setPetLoader,
    },
  };

  async function getAchivsByCategory(id) {
    const url = "http://localhost:9000/achivs";
    await axios
      .get(url, {
        params: {
          id: id,
        },
      })
      .then((res) => setAchivData(res.data))
      .catch((err) => console.error(err));
  }

  async function getPets() {
    setPetLoader(true);
    const url = "http://localhost:9000/pets";
    await axios
      .get(url, {
        params: {
          nickname: tmpCharacter.Nickname.toLowerCase(),
          server: tmpCharacter.Server.toLowerCase(),
        },
      })
      .then((res) => {
        setPetData(res.data);
        setFetchPetsData(true);
      })
      .catch((err) => {
        console.error(err);
        setResponseStatus(err.response.status);
      });
    setPetLoader(false);
  }

  async function getTalents() {
    setTalentsLoader(true);
    const url = "http://localhost:9000/talents";
    await axios
      .get(url, {
        params: {
          nickname: formData.Nickname.toLowerCase(),
          server: formData.Server.toLowerCase(),
        },
      })
      .then((res) => {
        setTalentsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTalentsLoader(false);
  }

  async function getAchievements() {
    setAchievementsLoader(true);
    const url = "http://localhost:9000/achievements";
    await axios
      .get(url, {
        params: {
          nickname: formData.Nickname.toLowerCase(),
          server: formData.Server.toLowerCase(),
        },
      })
      .then((res) => {
        setAchievementsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setAchievementsLoader(false);
  }

  async function getDungeons() {
    setDungeonsLoader(true);
    const url = "http://localhost:9000/dungeons";
    await axios
      .get(url, {
        params: {
          nickname: formData.Nickname.toLowerCase(),
          server: formData.Server.toLowerCase(),
        },
      })
      .then((res) => {
        setDungeonsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDungeonsLoader(false);
  }

  async function getRaids() {
    setRaidsLoader(true);
    const url = "http://localhost:9000/raids";
    await axios
      .get(url, {
        params: {
          nickname: formData.Nickname.toLowerCase(),
          server: formData.Server.toLowerCase(),
        },
      })
      .then((res) => {
        setRaidsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setRaidsLoader(false);
  }

  async function getMounts() {
    setMountsLoader(true);
    const url = "http://localhost:9000/mounts";
    await axios
      .get(url, {
        params: {
          nickname: formData.Nickname.toLowerCase(),
          server: formData.Server.toLowerCase(),
        },
      })
      .then((res) => {
        setMountsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setMountsLoader(false);
  }

  async function getRestPlayerData() {
    setRestDataLoading(true);
    const url = "http://localhost:9000/restCharacterInfo";
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
      });
    setRestDataLoading(false);
  }
  async function getPlayer() {
    setLoading(true);

    const url = "http://localhost:9000/mainCharacterInfo";
    await axios
      .get(url, {
        params: {
          nickname: formData.Nickname.toLowerCase(),
          server: formData.Server.toLowerCase(),
        },
      })
      .then((res) => {
        setTmpCharacterData(res.data);
        if (res.data.status !== 404) {
          setFetchPetsData(false);

          setTmpCharacter({
            Nickname: formData.Nickname.toLowerCase(),
            Server: formData.Server.toLowerCase(),
          });
          setMainResponseStatus(res.data.status);
          setIsFetch(true);
          setMainCharacterData(res.data);
          setSearchState("character");
          setIsCharacterSearched(true);
          setPetData({});
          setTalentsData({});
          setAchievementsData({});
          setDungeonsData({});
          setRaidsData({});
          setMountsData({});
          setCollectionState("mounts");
          getTalents();
          getAchievements();
          getDungeons();
          getRaids();
          getMounts();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

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
      .then((res) => {
        setTmpGuildData(res.data);
        if (res.data.status !== 404) {
          setGuildData(res.data);
          setIsFetch(true);
          setSearchState("guild");
          setIsGuildSearched(true);
          setGuildFetch(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err.data);
      });

    setLoading(false);
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

  const handleMouseLeave = (key) => {
    const item = document.getElementsByClassName("item")[key];
    item.style.boxShadow = "";
  };

  console.log(petData);
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
        {!isFetch && (
          <div
            className="find-container"
            style={{
              backgroundImage: "url(first-page-bg.jpg)",
            }}
          >
            <div className="logo-container animate__animated animate__backInDown animate__slow">
              <div
                className="first-page-header"
                style={{
                  backgroundImage: "url(header.png)",
                }}
              ></div>
            </div>

            <div className="find-inputs">
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
                  restData={getRestPlayerData}
                  mainCharacterData={mainCharacterData}
                  tmpCharacterData={tmpCharacterData}
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
                  guildData={guildData}
                />
              </div>
            </div>
          </div>
        )}

        {isFetch && searchState === "character" ? (
          <NavBar
            Link={Link}
            setSearchState={setSearchState}
            searchState={searchState}
            handleChange={handleChange}
            formData={formData}
            isFetch={isFetch}
            getFun={getPlayer}
            tmpCharacterData={tmpCharacterData}
          />
        ) : (
          isFetch && (
            <NavBar
              Link={Link}
              setSearchState={setSearchState}
              searchState={searchState}
              handleChange={handleChange}
              formData={formData}
              isFetch={isFetch}
              getFun={getGuild}
              tmpGuildData={tmpGuildData}
            />
          )
        )}

        {isFetch && (
          <Outlet
            context={{
              data: data,
              isFetch: isFetch,
              handleMouseLeave: handleMouseLeave,
              getSubCategory: getSubCategory,
              achivSubCategory: achivSubCategory,
              guildData: guildData,
              guildFetch: guildFetch,
              mainCharacterData: mainCharacterData,
              tmpCharacterData: tmpCharacterData,
              getPlayer: getPlayer,
              responseStatus: responseStatus,
              getPets: getPets,
              fetchPetsData: fetchPetsData,
              petData: petData,
              getAchivsByCategory: getAchivsByCategory,
              achivsData: achivsData,
              restDataLoading: restDataLoading,
              ObjectsNLoaders: ObjectsNLoaders,
              CollectionState: CollectionState,
            }}
          />
        )}

        {loading && <Slider />}
      </main>
    </div>
  );
}

export default App;
