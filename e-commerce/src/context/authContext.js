import React, {createContext, useState, useContext, useEffect} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const storedLoggedIn = localStorage.getItem('loggedIn')==='true'
  const storedUsername = localStorage.getItem('username')

  useEffect(()=>{
    if (storedLoggedIn && storedUsername){
      setLoggedIn(true)
      setUsername(storedUsername)
    }
    else{
      localStorage.setItem('loggedIn',false)
      localStorage.setItem('username','')  
    }
  },[storedLoggedIn,storedUsername])

  const handleLogin = (user)=>{
    localStorage.setItem('loggedIn',true)
    localStorage.setItem('username',user)
    setLoggedIn(true)
    setUsername(user)
  }

  const handleLogout = ()=>{
    localStorage.clear()
    setLoggedIn(false)
    setUsername('')
  }

  return(
    <AuthContext.Provider value={{loggedIn,username,handleLogin,handleLogout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=>useContext(AuthContext)