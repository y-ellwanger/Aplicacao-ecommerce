import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

const Home = () => {
  const {loggedIn, username} = useAuth()
  const navigate = useNavigate()

  const onButtonClick = () => {
    loggedIn? navigate('/logout') : navigate('/login')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn && <div>Your username is {username}</div>}
      </div>
    </div>
  )
}

export default Home