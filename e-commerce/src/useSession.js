import { useEffect, useState } from "react";

const useSession = () =>{
  const [sessionLogged, setSessionLogged] = useState(false)

  useEffect(()=>{
    fetch('/check_session',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response)=>{
        if(response.ok){
            setSessionLogged(true)
        }
    })
    .catch((error)=>{
        window.alert(error.message)
    })
  },[])

  return sessionLogged
}

export default useSession