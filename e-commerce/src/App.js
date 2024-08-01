import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './context/authContext'
import Login from './login'
import Home from './home'
import Logout from './components/logout'
import Register from './register'
import Layout from './components/layout'

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register' element={<Register />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
