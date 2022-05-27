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
		<div className="uk-flex uk-flex-center@l">
			<div className="uk-card uk-card-default uk-card-body">
				<form className="uk-form-stacked reg-form">
					<fieldset className="uk-fieldset">
						<legend className="uk-legend uk-text-bold reg-header uk-margin-small-bottom">Log In</legend>
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
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<a className="uk-form-icon uk-form-icon" href="" uk-icon="icon: mail"></a>
								<input className="uk-input uk-form-large" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>
						</div>
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<a className="uk-form-icon uk-form-icon" href="" uk-icon="icon: calendar"></a>
								<input className="uk-input uk-form-large" type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
							</div>
						</div>
						<button className="uk-margin-small-top uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom uk-button-large" onClick={handleSubmit}>
							CREATE ACCOUNT
						</button>
						<button className="uk-margin-small-top uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom uk-button-large reg-button">LOG IN</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
