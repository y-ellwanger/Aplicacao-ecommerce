import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React from 'react'
import Login from './login'
import Home from './home'
import Logout from './logout'
import Register from './register'
import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
