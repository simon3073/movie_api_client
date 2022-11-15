import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Import styles for this view
import './forgot-password.scss'

// import logo image
import logo from '../../img/site_logo.png'

export default function ForgotPassword(props) {
  const [usernamePassword, setUsernamePassword] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(
      '🚀 ~ file: forgot-password.jsx ~ line 14 ~ ForgotPassword ~ usernamePassword',
      usernamePassword
    )

    // if there are no client side registration errors
    // process the form
    try {
      const response = await axios.post(
        'https://movie-app-3073.herokuapp.com/resetpassword',
        {
          searchterm: usernamePassword,
        }
      )
      setFeedbackMsg('You have been sent an email with a reset password link.')
    } catch (error) {
      console.log('User not in system', error)
      setFeedbackMsg(
        'A user with that name or email could not be found in the system.'
      )
    }
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
          <h5 className="mb-4 text-center">
            <strong>Enter your email or username</strong>
          </h5>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              {/* <Form.Label>Enter your username or password:</Form.Label> */}
              <Form.Control
                type="text"
                value={usernamePassword}
                onChange={(e) => setUsernamePassword(e.target.value)}
                placeholder="Username/Password"
                required
              />
              {feedbackMsg && <p className="error-msg mt-3">{feedbackMsg}</p>}
            </Form.Group>
            <Button variant="primary" className="btn-block mt-4" type="submit">
              Send Reset Password Email
            </Button>
            <Link to={'/'}>
              <Button
                variant="link"
                className="btn-block text-white mt-3"
                type="link"
              >
                Back to Login
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
