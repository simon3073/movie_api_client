import React, { useState, useEffect } from 'react';
import { Row, Col, Container, OverlayTrigger, Tooltip, Button, Form, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

// connect to the redux actions
import { connect } from 'react-redux';
import { updateUser, deleteUser } from '../../actions/actions';

// Import styles for this view
import './profile-view.scss';

function ProfileView(props) {
	// define state for editing profile data
	const [editProfile, setEditProfile] = useState(false);

	// define state to render modal for deleting account
	const [modalView, setModalView] = useState(false);

	// define states updating profile and checking form values
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [favouriteMovies, setFavouriteMovies] = useState([]);
	const [values, setValues] = useState({
		birthdayErr: '',
		usernameErr: '',
		passwordErr: '',
		emailErr: ''
	});

	// baseurl for all API calls
	const baseURL = 'https://movie-app-3073.herokuapp.com/account/';

	// function to set error messages
	const setErrMessage = (obj) => {
		setValues((prev) => ({ ...prev, ...obj }));
	};

	// function to validate form values
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

	// on component load > fetch profile data
	useEffect(() => {
		fetchUserData();
	}, []);

	// asynchronous function to retrieve profile data
	// do this so we can keep up to date with Favourite movies added in session
	const fetchUserData = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(baseURL + props.loggedInUser, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setBirthday(response.data.Birthday);
			setUsername(response.data.Username);
			setPassword(response.data.Password);
			setEmail(response.data.Email);
			setFavouriteMovies(response.data.FavouriteMovies);
		} catch (error) {
			console.error(error);
		}
	};

	// to remove form edit profile fields
	const cancelChanges = () => {
		setEditProfile(false);
	};

	// on saving profile edit changes
	const saveChanges = async (e) => {
		e.preventDefault();
		if (validate()) {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.put(
					baseURL + props.loggedInUser,
					{
						Username: username,
						Password: password,
						Email: email,
						Birthday: birthday
					},
					{
						headers: { Authorization: `Bearer ${token}` }
					}
				);
				props.updateUser(response.data.Username);
				localStorage.setItem('user', response.data.Username);
				setEditProfile(false);
				alert('Your profile has been updated');
				window.open(`/account/${response.data.Username}`, '_self');
			} catch (error) {
				console.log('Error registering the user', error);
			}
		}
	};

	// function to delete account and redirect to login page
	const deleteAccount = async (e) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.delete(baseURL + props.loggedInUser, {
				headers: { Authorization: `Bearer ${token}` }
			});
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			props.deleteUser('');
			alert('Your profile has been deleted');
			window.open('/', '_self');
		} catch (error) {
			console.log('Error registering the user', error);
		}
	};

	// function to display profile birthday in account profile
	const displayDate = (d) => {
		const date = new Date(d);
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	};

	const editAccountProfile = () => {
		// on displaying edit profile form > set state of values to display including new Date object for the birthday
		setBirthday(new Date(birthday).toISOString().slice(0, 10));
		setEditProfile(true);
	};

	// delete movie from favourites
	const deleteMovie = async (movie) => {
		const updatedFavouritesArr = favouriteMovies.filter((m) => {
			return m.Title !== movie;
		});
		try {
			const token = localStorage.getItem('token');
			const response = await axios.delete(baseURL + props.loggedInUser + '/movies/' + movie, {
				headers: { Authorization: `Bearer ${token}` }
			});
			alert(`You removed ${movie} from your favourites list`);
			setFavouriteMovies(updatedFavouritesArr);
		} catch (error) {
			console.log('Error removing movie from list', error);
		}
	};

	// Functions needed to open and close the modal (below) to delete a user
	const modalClose = () => setModalView(false);
	const modalShow = () => setModalView(true);

	// Function that contains the modal to delete a users account
	const deleteUserModal = () => {
		return (
			<>
				<Modal show={modalView} centered className="modal-display">
					<Modal.Header>
						<Modal.Title>Delete your Account</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to delete your account?</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={modalClose}>
							No, Keep my Account
						</Button>
						<Button variant="danger" onClick={deleteAccount}>
							Yes, Delete
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	};

	// Display for the favourite movies column
	const favouriteMovieDisplay = () => {
		return favouriteMovies.length ? (
			favouriteMovies.map((movie) => (
				<div className="movie p-3 text-left" key={movie.Title}>
					{movie.Title}
					<OverlayTrigger overlay={<Tooltip id="my-tooltip-id">Remove from favourites</Tooltip>}>
						<a>
							<FaTrash onClick={() => deleteMovie(movie.Title)} movie={movie.Title} className="icon" />
						</a>
					</OverlayTrigger>
				</div>
			))
		) : (
			<div>No movies in your favourites list</div>
		);
	};

	return (
		<Container className="main-view">
			<Row className="header justify-content">
				<Col>
					<div className="p-3 font-weight-bold text-center">Account Profile</div>
				</Col>
			</Row>
			<Row className="justify-content-center mt-4 account-grid">
				<Col md={11} lg={5} className="account-details">
					<h3>Account Info</h3>
					<hr></hr>
					{editProfile ? (
						<Form className="reg-form">
							<Form.Group controlId="username">
								<Form.Label>Username:</Form.Label>
								<Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter a username" required />
								{values.usernameErr && <p className="error-msg">{values.usernameErr}</p>}
							</Form.Group>
							<Form.Group controlId="password">
								<Form.Label>Password:</Form.Label>
								<Form.Control type="password" placeholder="Enter a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
								{values.passwordErr && <p className="error-msg">{values.passwordErr}</p>}
							</Form.Group>
							<Form.Group controlId="email">
								<Form.Label>Your email:</Form.Label>
								<Form.Control type="email" placeholder="Enter an email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
								{values.emailErr && <p className="error-msg">{values.emailErr}</p>}
							</Form.Group>
							<Form.Group controlId="dob">
								<Form.Label>Enter your Birth Date</Form.Label>
								<Form.Control type="date" placeholder="Date of Birth" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
								{values.birthdayErr && <p className="error-msg">{values.birthdayErr}</p>}
							</Form.Group>
							<Button variant="primary" className="btn-block text-white mt-4" type="submit" onClick={saveChanges}>
								Update Profile
							</Button>
							<Button variant="link" className="btn-block mt-1" type="submit" onClick={cancelChanges}>
								Cancel
							</Button>
						</Form>
					) : (
						<>
							<div>
								<strong>Username:</strong> {username}
							</div>
							<div>
								<strong>Email:</strong> {email}
							</div>
							<div>
								<strong>Birthday: </strong>
								{birthday ? displayDate(birthday) : ''}
							</div>
							<Button variant="primary" className="btn-block mt-5" type="primary" onClick={editAccountProfile}>
								Edit Profile
							</Button>
							<Button variant="danger" className="btn-block text-white mt-3" onClick={modalShow}>
								Delete Account
							</Button>
						</>
					)}
				</Col>
				<Col md={11} lg={6} className="favourite-details ">
					<h3>Favourite Movies</h3>
					<hr></hr>
					{favouriteMovieDisplay()}
				</Col>
			</Row>
			<Row className="back-panel justify-content mt-3">
				<Col>
					<div className=" text-center p-3">
						<Button variant="warning" className="w-70 ms-auto back-movies" size="lg" href="/">
							Go back to the movies
						</Button>
					</div>
				</Col>
			</Row>

			{deleteUserModal()}
		</Container>
	);
}

// 	connect to the actions and dispatchers
const mapStateToProps = (state) => {
	const { loggedInUser } = state;
	return { loggedInUser };
};

export default connect(mapStateToProps, { updateUser, deleteUser })(ProfileView);
