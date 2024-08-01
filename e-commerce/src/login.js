import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UncontrolledAlert, Button, Form, FormGroup, Label, FormFeedback, Input, Card, CardBody, CardTitle } from 'reactstrap'
import { useAuth } from './context/authContext'
import './style/login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [loginError, setLoginError] = useState('')
  const {handleLogin} = useAuth()

  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('loggedIn')==='true'){
      navigate('/')
    }
  },[navigate])

  const onButtonClick = ()=>{
    setUsernameError('')
    setPasswordError('')
    setIsUsernameValid(true)
    setIsPasswordValid(true)
    setLoginError('')

    if (!username){
        setUsernameError('Please insert your username')
        setIsUsernameValid(false)
        return
    }

    if (!password){
        setPasswordError('Please insert your password')
        setIsPasswordValid(false)
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
        handleLogin(username)
        navigate('/')
      }
      else if(response.status===401){
        throw new Error('Login error: Incorrect username or password')
      }
      else if(response.status===400){
        throw new Error('Login error: This username does not exist')
      }
      else if (response.status===500){
        throw new Error('Network error: could not connect to the server')
      }
      else throw new Error('Error: an unexpected error ocurred')
    }) 
    .catch((error)=>{
      setLoginError(error.message)
    })
  }

  return (
    <div className='login-container'>
      <Card className='login-card'>
        <CardBody>
          <CardTitle tag='h5'>Login</CardTitle>
          {loginError && <UncontrolledAlert color='danger'>{loginError}</UncontrolledAlert>}
          <Form>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Input
                id='username' 
                placeholder='Insert your username'
                type='text'
                onChange={(ev)=>setUsername(ev.target.value)}
                invalid={!isUsernameValid}
              />
              <FormFeedback>{usernameError}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password</Label>
              <Input 
                id='password'
                placeholder='Insert your password'
                type='password'
                onChange={(ev)=>setPassword(ev.target.value)}
                invalid={!isPasswordValid}
              />
              <FormFeedback>{passwordError}</FormFeedback>
            </FormGroup>
            <Button color='primary' onClick={onButtonClick}>Sign in</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
    
export default Login
