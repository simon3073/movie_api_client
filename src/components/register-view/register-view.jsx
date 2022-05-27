import React, { useState } from 'react';

// Import styles for this view
import './register.scss';

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
		<div>
			<form>
				<fieldset>
					<legend>Create Account</legend>
					<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
					<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

					<input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />

					<button onClick={handleSubmit}>LOG IN</button>
					<button>LOG IN</button>
				</fieldset>
			</form>
		</div>
	);
}
