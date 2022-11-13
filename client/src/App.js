import axios from "axios";
import React, { useState, useEffect } from "react";
import "./app.css";
import Search from "./components/Search";

import Slider from "./components/Slider";
//import Character from './components/Character';
import {Outlet, Link, useNavigate} from 'react-router-dom';
//import { useOutletContext } from "react-router-dom";


function App() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    Nickname: "",
    Server: "",
  });
  const [isFetch, setIsFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

  }

  async function getPlayer() {
    setLoading(true);
    const url = "http://localhost:9000/test";
    await axios
      .get(url, {
        params: { nickname: formData.Nickname, server: formData.Server },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    setIsFetch(true);

    setLoading(false);
    navigate('/')
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

  console.log(data.profile);
  return (
    
       
        <div className="app" style={{
          backgroundColor: "rgb(56,31,37)",
        }}>
          <main
            // style={{
            //   backgroundImage: isFetch && "url(hall3.jpg)",
            // }}
          >
            <div className="bg"
             style={{
              backgroundImage: isFetch && "url(hall3.jpg)",
            }}
            >

            </div>
            <Search
              handleChange={handleChange}
              getPlayer={getPlayer}
              isFetch={isFetch}
              Link={Link}
             // Route={Route}
            />

            {isFetch && (
 
              //<Character data={data} isFetch={isFetch} handleMouseLeave={handleMouseLeave}/>
              <Outlet context={{data: data ,isFetch: isFetch, handleMouseLeave: handleMouseLeave}}/>
            )}
            {/* {isFetch && <div className="talents">s</div>} */}
            {loading && <Slider />}
          </main>
        </div>

  );
}

export default App;
