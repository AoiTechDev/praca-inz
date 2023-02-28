import React from 'react';

import './index.css';
import App from './App';
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from './components/Character'
import Guild from './components/Guild'
import Dungeons from './components/Dungeons';
import Raids from './components/Raids';
import PVP from './components/PVP';
import Collection from './components/Collection';
import Comparison from './components/Comparison';


export default function Root() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Character/>}/>
            <Route path='guild' element={<Guild/>}/>
            <Route path='dungeons' element={<Dungeons/>}/>
            <Route path='raids' element={<Raids/>}/>
            <Route path='pvp' element={<PVP/>}/>
            <Route path='collection' element={<Collection/>}/>
            <Route path='comparison' element={<Comparison/>}/>
            
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Root/>
);
