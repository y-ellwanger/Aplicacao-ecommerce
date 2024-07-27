import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Logout = forwardRef((_,ref)=>{
  const [modal, setModal] = useState(false)
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  const navigate = useNavigate()

  const toggle = () => setModal(!modal)

  const handleLogout= () =>{
    if (!loggedIn){
      navigate('/')
    }
    else{
      fetch('/logout',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(()=>{        
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('username')
        navigate('/')
      })
      .catch((error)=>{
        window.alert(error.message)
      })
    }
  }

  useImperativeHandle(ref,()=>({
    openModal: ()=>setModal(true)
  }))
  

  return(
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Logout?</ModalHeader>
        <ModalBody>Do you want to logout from your account?</ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={handleLogout}>Confirm</Button>
          <Button color='secondary' onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
})

export default Logout