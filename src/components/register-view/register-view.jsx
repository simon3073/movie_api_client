import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

// Import styles for this view
import './register.scss';

// import logo image
import logo from '../../img/site_logo.png';

// Display the registration form
export default function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthday);
		// send authentication request
		props.onLoggedIn(username);
	};

	return (
		<Container fluid className="h-100 d-flex justify-content-center align-items-center">
			<Card className="register-card">
				<div className="m-4 text-center">
					<img src={logo} style={{ width: '400px' }} />
				</div>

				<Card.Body>
					<h2 className="mb-2 text-center" style={{ color: '#ffbd24' }}>
						<strong>Create An Account</strong>
					</h2>
					<Form className="reg-form">
						<Form.Group controlId="username">
							<Form.Label>Username:</Form.Label>
							<Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter a username" required />
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password:</Form.Label>
							<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a password" required />
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Your email:</Form.Label>
							<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter an email address" required />
						</Form.Group>
						<Form.Group controlId="dob">
							<Form.Label>Enter your Birth Date</Form.Label>
							<Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="Date of Birth" />
						</Form.Group>
						<Button variant="primary" className="btn-block mt-5" type="submit" onClick={handleSubmit}>
							Sign Up
						</Button>
						<Button variant="link" className="btn-block text-white mt-3" type="submit">
							I already have an account
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}
