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
		<div className="uk-flex uk-flex-center@l">
			<div className="uk-card uk-card-default uk-card-body">
				<form className="uk-form-stacked login-form">
					<fieldset className="uk-fieldset">
						<legend className="uk-legend uk-text-bold login-header uk-margin-small-bottom">Log In</legend>
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<a className="uk-form-icon uk-form-icon" href="" uk-icon="icon: user"></a>
								<input className="uk-input uk-form-large" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
							</div>
						</div>
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<a className="uk-form-icon uk-form-icon" href="" uk-icon="icon: lock"></a>
								<input className="uk-input uk-form-large" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
							</div>
						</div>
						<button className="uk-margin-small-top uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom uk-button-large back-button" onClick={handleSubmit}>
							LOG IN
						</button>
						<button className="uk-margin-small-top uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom uk-button-large login-button">SIGN UP</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
