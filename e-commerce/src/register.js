import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const[usernameError, setUsernameError] = useState('')
  const[passwordError, setPasswordError] = useState('')
  const[emailError, setEmailError] = useState('')

  const navigate = useNavigate()

  useEffect(()=>{
    if (localStorage.getItem('loggedIn') === 'true'){
      navigate('/')
    }
  },[navigate])

  const onButtonClick = ()=>{
    setEmailError('')
    setPasswordError('')
    setUsernameError('')
    
    if (!username){
      setUsernameError('Please insert a username')
      return
    }
    if(!password){
      setPasswordError('Please insert a password')
      return
    }
    if(!email){
      setEmailError('Please insert a email')
      return
    }

    fetch('/register',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'username': username, 'password': password, 'email': email})
    })
    .then((response)=>{
      if (response.ok){
        window.alert('User created successfuly, redirecting to login page')
        setUsername('')
        setEmail('')
        setPassword('')
        navigate('/login')
      }
      else if(response.status===400){
        throw new Error('Validation error: Invalid input given')
      }
      else if(response.status===409){
        throw new Error('Compatibility error: This username is already taken')
      }
      else if(response.status===500){
        throw new Error('Network error: Could not connect to the server')
      }
      else throw new Error('An unexpected error ocurred')
    })
    .catch((error)=>{
      window.alert(error.message)
    })

  }

  return(
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
    <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder='Enter your username here'
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className='errorLabel'>{usernameError}</label>
      </div>
    <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder='Enter your email here'
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className='errorLabel'>{emailError}</label>
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
        <input className={'inputButton'} type='button' onClick={onButtonClick} value={'Register'} />
      </div>
    </div>
  )

}

export default Register