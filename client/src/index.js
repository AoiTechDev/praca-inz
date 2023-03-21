import React from 'react';

import './index.css';
import App from './App';
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from './components/Character'
import Guild from './components/Guild'



export default function Root() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Character/>}/>
            <Route path='guild' element={<Guild/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Root/>
);
