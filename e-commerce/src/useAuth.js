import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () =>{
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true'
    const storedUsername = localStorage.getItem('username')
    setLoggedIn(storedLoggedIn) 
    setUsername(storedUsername || '')
  }, [])

  return {loggedIn, username}

}

export default useAuth