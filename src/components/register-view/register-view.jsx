import React, { useState } from 'react';

// Import styles for this view
import './register.scss';

export default function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	// variables for multiple UIKIT css class styles
	const ukCardBody = 'uk-card uk-card-default uk-card-body';
	const ukForm = 'uk-form-stacked login-form';
	const ukFormTitle = 'uk-legend uk-text-bold login-header uk-margin-small-bottom';
	const ukFromInputDiv = 'uk-inline uk-width-1-1';
	const ukFormLabel = 'uk-form-icon uk-form-icon';
	const ukFormTextInput = 'uk-input uk-form-large';
	const ukFormButton = 'uk-margin-small-top uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom uk-button-large';

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthday);
		// send authentication request
		props.onLoggedIn(username);
	};

	return (
		<div>
			<div className={ukCardBody}>
				<form className={ukForm}>
					<fieldset className="uk-fieldset">
						<legend className={ukFormTitle}>Create New Account</legend>
						<div className="uk-margin">
							<div className={ukFromInputDiv}>
								<span className={ukFormLabel} uk-icon="icon: user"></span>
								<input className={ukFormTextInput} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
							</div>
						</div>
						<div className="uk-margin">
							<div className={ukFromInputDiv}>
								<span className={ukFormLabel} uk-icon="icon: lock"></span>
								<input className={ukFormTextInput} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
							</div>
						</div>
						<div className="uk-margin">
							<div className={ukFromInputDiv}>
								<span className={ukFormLabel} uk-icon="icon: mail"></span>
								<input className={ukFormTextInput} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>
						</div>
						<div className="uk-margin">
							<div className={ukFromInputDiv}>
								<span className="uk-form-icon uk-form-icon" uk-icon="icon: calendar"></span>
								<input className={ukFormTextInput} type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
							</div>
						</div>
						<button className={ukFormButton} onClick={handleSubmit}>
							CREATE ACCOUNT
						</button>
						<button className={ukFormButton + ' reg-button'}>LOG IN</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
