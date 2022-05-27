import React, { useState } from 'react';

// Import styles for this view
import './login.scss';

export default function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		// send authentication request
		props.onLoggedIn(username);
	};

	return (
		<div>
			<form>
				<fieldset>
					<legend>Log In</legend>
					<input className="uk-input uk-form-large" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
					<input className="uk-input uk-form-large" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<button onClick={handleSubmit}>LOG IN</button>
					<button>SIGN UP</button>
				</fieldset>
			</form>
		</div>
	);
}
