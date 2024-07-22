import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const Logout = ()=>{
  const {loggedIn, username} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if (!loggedIn){
        navigate('/')
    }
    fetch('/logout',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(()=>{        
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('username')
      navigate('/')
    })
    .catch((error)=>{
      window.alert(error.message)
    })
  },[loggedIn,navigate])

  return null

}
export default Logout