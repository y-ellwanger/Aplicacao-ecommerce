import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useAuth } from './context/authContext'

const Home = () => {
  const {loggedIn, username} = useAuth()
  const navigate = useNavigate()

  const onLoginButtonClick = () => navigate('/login')

  const onRegisterButtonClick = ()=>{
    navigate('/register')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        {!loggedIn && <Button color='primary' onClick={onLoginButtonClick}>Login</Button>}
        {loggedIn && <div>Your username is {username}</div>}
        {!loggedIn && <Button color='primary' onClick={onRegisterButtonClick}>Register</Button>}
      </div>
    </div>
  )
}

export default Home