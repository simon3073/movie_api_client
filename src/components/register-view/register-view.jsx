import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import styles for this view
import './register.scss';

// import logo image
import logo from '../../img/site_logo.png';

// Display the registration form
export default function RegisterView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [values, setValues] = useState({
		birthdayErr: '',
		usernameErr: '',
		passwordErr: '',
		emailErr: ''
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			// if there are no client side registration errors
			// process the form
			try {
				const response = await axios.post('https://movie-app-3073.herokuapp.com/register', {
					Username: username,
					Password: password,
					Email: email,
					Birthday: birthday
				});
				const data = response.data;
				// console.log(data);
				window.open('/', '_self');
			} catch (error) {
				console.log('Error registering the user', error);
			}
		}
	};

	// function to set error messages
	const setErrMessage = (obj) => {
		setValues((prev) => ({ ...prev, ...obj }));
	};

	const validate = () => {
		let isReq = true;
		// reset error checking values
		setValues({
			birthdayErr: '',
			usernameErr: '',
			passwordErr: '',
			emailErr: ''
		});
		// check username existence and length
		if (!username) {
			setErrMessage({ usernameErr: 'Username Required' });
			isReq = false;
		} else if (username.length < 4) {
			setErrMessage({ usernameErr: 'Username must be at least 4 characters long' });
			isReq = false;
		}
		// check password existence and length
		if (!password) {
			setErrMessage({ passwordErr: 'Password Required' });
			isReq = false;
		} else if (password.length < 6) {
			setErrMessage({ passwordErr: 'Password must be at least 6 characters long' });
			isReq = false;
		}
		// check email existence and format
		const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!email) {
			setErrMessage({ emailErr: 'Email Required' });
			isReq = false;
		} else if (!email.match(mailFormat)) {
			setErrMessage({ emailErr: 'You have an invalid email address' });
			isReq = false;
		}
		// check birthday existence and format
		if (!birthday) {
			setErrMessage({ birthdayErr: 'Birthday Required' });
			isReq = false;
		}

		return isReq;
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
							{values.usernameErr && <p className="error-msg">{values.usernameErr}</p>}
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password:</Form.Label>
							<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a password" required />
							{values.passwordErr && <p className="error-msg">{values.passwordErr}</p>}
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Your email:</Form.Label>
							<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter an email address" required />
							{values.emailErr && <p className="error-msg">{values.emailErr}</p>}
						</Form.Group>
						<Form.Group controlId="dob">
							<Form.Label>Enter your Birth Date</Form.Label>
							<Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="Date of Birth" />
							{values.birthdayErr && <p className="error-msg">{values.birthdayErr}</p>}
						</Form.Group>
						<Button variant="primary" className="btn-block mt-5" type="submit" onClick={handleSubmit}>
							Sign Up
						</Button>
						<Link to={'/'}>
							<Button variant="link" className="btn-block text-white mt-3" type="link">
								I already have an account
							</Button>
						</Link>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}
