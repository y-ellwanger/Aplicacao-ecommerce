import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ()=>{
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  const navigate = useNavigate()

  useEffect(()=>{
    if (!loggedIn){
      navigate('/')
    }
    else{
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
    }
    },[loggedIn,navigate])

  return null

}
export default Logout