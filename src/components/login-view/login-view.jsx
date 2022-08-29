import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Card, Container, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// connect to the redux actions
import { connect } from 'react-redux'
import { setUser } from '../../actions/actions'

// Import styles for this view
import './login.scss'

// import logo image
import logo from '../../img/site_logo.png'

function LoginView(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameErr, setUsernameErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [modalView, setModalView] = useState(false)

  //   useEffect(() => {
  //     const listener = (event) => {
  //       if (event.code === 'Enter' || event.code === 'NumpadEnter') {
  //         console.log('Enter Pressed', username, password)
  //         handleSubmit(event)
  //       }
  //     }
  //     document.addEventListener('keydown', listener)
  //     return () => {
  //       document.removeEventListener('keydown', listener)
  //     }
  //   }, [])

  const handleSubmit = async (e) => {
    console.log(
      '🚀 ~ file: login-view.jsx ~ line 62 ~ handleSubmit ~ handleSubmit',
      username,
      password
    )

    e.preventDefault()
    if (validate()) {
      // if there are no client side registration errors
      // process the form
      try {
        const response = await axios.post(
          'https://movie-app-3073.herokuapp.com/login',
          {
            Username: username,
            Password: password,
          }
        )

        // set the user property in redux store
        props.setUser(response.data.user.Username)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', response.data.user.Username)
        // Log in to the app
        props.onLoggedIn()
      } catch (error) {
        setModalView(true)
        console.log('User not in system', error)
      }
    }
  }

  // Validate the forms input on submit to add extra layer of code validation and client advice
  const validate = () => {
    console.log('Validate - ', username, password)
    let isReq = true
    // reset error checking values
    setUsernameErr('')
    setPasswordErr('')
    // check username existence and length
    if (!username) {
      setUsernameErr('Username Required')
      isReq = false
    } else if (username.length < 4) {
      setUsernameErr('Username must be at least 4 characters long')
      isReq = false
    }
    // check password existence and length
    if (!password) {
      setPasswordErr('Password Required')
      isReq = false
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long')
      isReq = false
    }
    return isReq
  }

  // Functions needed to open and close the modal (below) to delete a user
  const modalClose = () => setModalView(false)

  // Function that contains the modal to delete a users account
  const noUserModal = () => {
    return (
      <>
        <Modal show={modalView} centered className="modal-display modal-md">
          <Modal.Header>
            <Modal.Title>Invalid Username or Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The username or password were entered incorrectly, or there is not
            an account associated with these details.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={modalClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  return (
    <Container
      fluid
      className="login-container d-flex flex-column justify-content-center align-items-center"
    >
      <Card className="login-card">
        <div className="m-4 text-center">
          <img src={logo} />
        </div>
        <Card.Body>
          <h2 className="mb-2 text-center">
            <strong>Login</strong>
          </h2>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
              {usernameErr && <p className="error-msg">{usernameErr}</p>}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                minLength="8"
                placeholder="Your Password must be 8 or more characters"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {passwordErr && <p className="error-msg">{passwordErr}</p>}
            <Button
              variant="primary"
              className="btn-block mt-5"
              type="submit"
              //   onClick={handleSubmit}
            >
              Log In
            </Button>
            <Link to={'/register'}>
              <Button
                variant="link"
                className="btn-block text-white mt-3"
                type="link"
              >
                Create an an account
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
      {noUserModal()}
    </Container>
  )
}

// 	connect to the actions
export default connect(null, { setUser })(LoginView)
