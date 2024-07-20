import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Login from './login'
import Home from './home'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
