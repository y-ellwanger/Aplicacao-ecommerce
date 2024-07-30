import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'
import Logout from './logout'
import { Button } from 'reactstrap'

const Home = () => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const {loggedIn, username, handleLogout} = useAuth()
  const navigate = useNavigate()

  const toggleModal = ()=> setIsModalOpen(!isModalOpen)

  const onLoginButtonClick = () => loggedIn? toggleModal() : navigate('/login')

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
        <Logout isOpen={isModalOpen} toggle={toggleModal} onLogout={handleLogout}/>
        {loggedIn && <div>Your username is {username}</div>}
        {!loggedIn && <Button color='primary' onClick={onRegisterButtonClick}>Register</Button>}
      </div>
    </div>
  )
}

export default Home