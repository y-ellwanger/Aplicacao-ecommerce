import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UncontrolledAlert, Button, Form, FormGroup, Label, FormFeedback, Input, FormText } from 'reactstrap'

const Register = ()=>{
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const[usernameError, setUsernameError] = useState('')
  const[passwordError, setPasswordError] = useState('')
  const[emailError, setEmailError] = useState('')
  const[isUsernameValid, setIsUsernameValid] = useState(true)
  const[isEmailValid, setIsEmailValid] = useState(true)
  const[isPasswordValid, setIsPasswordValid] = useState(true)
  const[registerError, setRegisterError] = useState('')

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
    setIsEmailValid(true)
    setIsPasswordValid(true)
    setIsUsernameValid(true)
    setRegisterError('')
    
    if (!username){
      setUsernameError('Please insert a username')
      setIsUsernameValid(false)
      return
    }
    if(!password){
      setPasswordError('Please insert a password')
      setIsPasswordValid(false)
      return
    }
    if(!email){
      setEmailError('Please insert a email')
      setIsEmailValid(false)
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
      setRegisterError(error.message)
    })

  }

  return(
    <>
      <div>Register</div>
      <br />
      {registerError && <UncontrolledAlert color='danger'>{registerError}</UncontrolledAlert>}
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
          <FormText>Minimal of 4 characters, only letters and numbers</FormText>
        </FormGroup>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input
            id='email' 
            placeholder='Insert your email'
            type='email'
            onChange={(ev)=>setEmail(ev.target.value)}
            invalid={!isEmailValid}
          />
          <FormFeedback>{emailError}</FormFeedback>
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
          <FormText>Minimal of 6 characters</FormText>
        </FormGroup>
        <Button onClick={onButtonClick}>Register</Button>
      </Form>
    </>
  )

}

export default Register