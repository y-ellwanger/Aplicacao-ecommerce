import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [usernameError, setusernameError] = useState('')
    const [passwordError, setpasswordError] = useState('')

    const navigate = useNavigate()

    const onButtonClick = ()=>{
        setusernameError('')
        setpasswordError('')

        if ('' == username){
            setusernameError('Please insert your username')
            return
        }

        if ('' == password){
            setpasswordError('Please insert your password')
            return
        }
      
        fetch('login', {
          method: 'POST',
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify({'username': username, 'password': password})
        })
        .then((response) => response.json())
        .then((response)=>{
          if('False' != response){
              props.setloggedIn(true)
              props.setusername(username)
              navigate('/')
          } else{
              window.alert('Wrong username or password')
          }
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
              placeholder="Enter your username here"
              onChange={(ev) => setusername(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{usernameError}</label>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setpassword(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
          </div>
        </div>
      )
}
    
export default Login
