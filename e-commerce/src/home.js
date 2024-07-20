import React, { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, username } = props
  const navigate = useNavigate()

  useEffect(()=>{
    const loggedIn = localStorage.getItem('loggedIn')
    const storedUsername = localStorage.getItem('username')
  }, [navigate, props])

  const onButtonClick = () => {
    // You'll update this function later
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
        {loggedIn ? <div>Your username is {username}</div> : <div />}
      </div>
    </div>
  )
}

export default Home