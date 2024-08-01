import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useAuth } from "../context/authContext";

const Logout = ({isOpen, toggle})=>{
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  const navigate = useNavigate()
  const {handleLogout} = useAuth()

  const performLogout= () =>{
    if (!loggedIn){
      toggle()
      navigate('/login')
    }
    else{
      fetch('/logout',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then((response)=>{
        if(response.status===500) throw new Error('Failed to logout: Could not connect to the server')        
        toggle()
        handleLogout()
        navigate('/')
      })
      .catch((error)=>{
        window.alert(error.message)
      })
    }
  }

  return(
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Logout?</ModalHeader>
        <ModalBody>Do you want to logout from your account?</ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={performLogout}>Confirm</Button>
          <Button color='secondary' onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Logout