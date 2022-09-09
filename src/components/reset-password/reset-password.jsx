import React, { useState, useEffect } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { Form, Button, Card, Container, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

// Import styles for this view
import './reset-password.scss'

// import logo image
import logo from '../../img/site_logo.png'

export default function ResetPassword(props) {
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [modalView, setModalView] = useState(false)
  const [tokenValid, setTokenValid] = useState(false)
  const [username, setUsername] = useState('')

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password1 !== password2) {
      setFeedbackMsg('Passwords do not match')
    } else if (password1.length < 8) {
      setFeedbackMsg('Password must be longer than 8 characters')
    } else {
      // if there are no client side registration errors
      // process the form to update the password
      console.log(password1, username)
      try {
        const response = await axios.put(
          'https://movie-app-3073.herokuapp.com/updatepassword',
          {
            password: password1,
            username: username,
          }
        )
        setModalView(true)
      } catch (error) {
        console.error(error)
        setFeedbackMsg(
          'Your password could not be updated, please try again later'
        )
      }
    }
  }

  // on component load > validate the token from the url
  useEffect(() => {
    const validatetoken = async () => {
      const queryParams = queryString.parse(window.location.search)
      try {
        const token = await axios.post(
          'https://movie-app-3073.herokuapp.com/validatetoken',
          {
            token: queryParams.token,
            userid: queryParams.id,
          }
        )
        setUsername(token.data.Username)
        setTokenValid(true)
      } catch (error) {
        setTokenValid(false)
      }
    }
    validatetoken()
  })

  // Functions needed to open and close the modal (below) to delete a user
  const modalClose = () => {
    setModalView(false)
    history.push('/')
  }

  // Function that contains the modal to delete a users account
  const updateModal = () => {
    return (
      <>
        <Modal show={modalView} centered className="modal-display modal-md">
          <Modal.Header>
            <Modal.Title>Your password has been updated!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Click the 'Go to Login Page below to log in to the site.'
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={modalClose}>
              Go to Log In Page
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
        {tokenValid ? (
          <Card.Body>
            <h5 className="mb-4 text-center">
              <strong>Reset Your Password</strong>
            </h5>
            <Form className="login-form" onSubmit={handleSubmit}>
              <Form.Group controlId="password">
                <Form.Label>Type your new password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  placeholder="New Password"
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Re-Type your new password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="New Password"
                  required
                />
                {feedbackMsg && <p className="error-msg mt-3">{feedbackMsg}</p>}
              </Form.Group>
              <Button
                variant="primary"
                className="btn-block mt-5"
                type="submit"
              >
                Update Password
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
        ) : (
          <>
            <div className="expired">
              This link has expired, use the link below to have another email
              sent out.
            </div>
            <Link to={'/forgotpassword'}>
              <Button
                variant="link"
                className="btn-block forgot-password mt-1"
                type="link"
              >
                Send another email
              </Button>
            </Link>
          </>
        )}
      </Card>
      {updateModal()}
    </Container>
  )
}
