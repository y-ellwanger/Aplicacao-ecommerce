import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('loggedIn')==='true'){
      navigate('/')
    }
  },[])

  const onButtonClick = ()=>{
    setUsernameError('')
    setPasswordError('')

    if (!username){
        setUsernameError('Please insert your username')
        return
    }

    if (!password){
        setPasswordError('Please insert your password')
        return
    }
  
    fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify({'username': username, 'password': password})
    })
    .then((response) => {
      if(response.ok){
        return response.json()
      }
      else throw new Error("Login error")
    })
    .then((data)=>{
      localStorage.setItem('loggedIn','true')
      localStorage.setItem('username',username)
      navigate('/')
    }) 
    .catch((error)=>{
      window.alert('Wrong username or password')
    })
  }

  return (
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          <div>Login</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={username}
            placeholder='Enter your username here'
            onChange={(ev) => setUsername(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{usernameError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={password} type='password'
            placeholder='Enter your password here'
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type='button' onClick={onButtonClick} value={'Log in'} />
        </div>
      </div>
  )
}
    
export default Login
