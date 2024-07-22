import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Login from './login'
import Home from './home'
import Logout from './logout'
import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
