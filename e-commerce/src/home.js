import React, {useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'
import Logout from './logout'
import { Button } from 'reactstrap'

const Home = () => {
  const {loggedIn, username} = useAuth()
  const logout = useRef()
  const navigate = useNavigate()

  const onLoginButtonClick = () => {
    loggedIn? logout.current.openModal() : navigate('/login')
  }
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
        <Button color='primary' onClick={onLoginButtonClick}>{loggedIn? 'Log out': 'Login'}</Button>
        <Logout ref={logout}/>
        <input
          className={'inputButton'}
          type="button"
          onClick={onLoginButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn && <div>Your username is {username}</div>}
        {!loggedIn && <Button color='primary' onClick={onRegisterButtonClick}>Register</Button>}
      </div>
    </div>
  )
}

export default Home