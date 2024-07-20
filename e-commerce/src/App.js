import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Login from './login'
import Home from './home'
import logo from './logo.svg'
import './App.css'

function App() {

  const [loggedIn, setloggedIn] = useState(false)
  const [username, setusername] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} setloggedIn={setloggedIn} username={username}/>}/>
          <Route path="/login" element={<Login setloggedIn={setloggedIn} setusername={setusername}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
