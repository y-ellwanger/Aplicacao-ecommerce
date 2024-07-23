import {useEffect, useState} from "react";

const useAuth = () =>{
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(()=>{
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true'
    const storedUsername = localStorage.getItem('username')
    setLoggedIn(storedLoggedIn)
    setUsername(storedUsername || '')
  }, [])

  return {loggedIn, username}

}

export default useAuth