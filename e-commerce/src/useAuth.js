import {useEffect, useState} from "react";

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

}