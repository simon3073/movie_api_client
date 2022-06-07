import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container } from 'react-bootstrap';

// Import styles for this view
import './login.scss';

// import logo image
import logo from '../../img/site_logo.png';

export default function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(username, password);
		// send authentication request
		// props.onLoggedIn(username);
		try {
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			const response = await axios.post('https://movie-app-3073.herokuapp.com/login', {
				Username: username,
				Password: password
			});
			const data = response.data;
			props.onLoggedIn(data);
		} catch (error) {
			console.log('User not in system', error);
		}
	};

	return (
		<Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center">
			<Card className="login-card">
				<div className="m-4 text-center">
					<img src={logo} style={{ width: '400px' }} />
				</div>
				<Card.Body>
					<h2 className="mb-2 text-center" style={{ color: '#ffbd24' }}>
						<strong>Login</strong>
					</h2>
					<Form className="login-form">
						<Form.Group controlId="username">
							<Form.Label>Username:</Form.Label>
							<Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password:</Form.Label>
							<Form.Control type="password" value={password} minLength="8" placeholder="Your Password must be 8 or more characters" onChange={(e) => setPassword(e.target.value)} required />
						</Form.Group>
						<Button variant="primary" className="btn-block mt-5" type="submit" onClick={handleSubmit}>
							Log In
						</Button>
						<Button variant="link" className="btn-block text-white mt-3" type="submit">
							Create an an account
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}
