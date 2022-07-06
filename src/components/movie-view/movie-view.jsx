import React, { Component } from 'react';
import { Row, Col, Button, Badge, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import axios from 'axios';

// connect to the redux actions
import { connect } from 'react-redux';
import { setGenre } from '../../actions/actions';

import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Toggle from 'react-bootstrap-toggle';
import ImageLoader from '../image-loader/image-loader';
import { Link } from 'react-router-dom';

// Import styles for this view
import './movie-view.scss';

// import IMDB image
import imdb_logo from '../../img/imdb_logo.png';

class MovieView extends Component {
	constructor() {
		// set up states for Toggle and Modal views and Movie id and Title to check favourites list
		super();
		this.state = {
			toggleActive: false,
			movieData: {
				title: '',
				id: ''
			},
			modalView: false,
			modalData: null
		};
		this.onToggle = this.onToggle.bind(this);
		this.modalShowHide = this.modalShowHide.bind(this);
	}

	// fetch user data for Favourites list to set the toggle status of Add to Favourites
	async fetchUserData() {
		try {
			const token = localStorage.getItem('token');
			const user = localStorage.getItem('user');
			const response = await axios.get(`https://movie-app-3073.herokuapp.com/account/${user}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			this.checkToggleStatus(response.data.FavouriteMovies);
		} catch (error) {
			alert('There was an issue retrieving your account details. Please try again later');
			// console.error(error);
		}
	}

	// set the toggle to true if this movie is part of the favourites already
	checkToggleStatus(arr) {
		const isFavourite = arr.find((m) => m.Title === this.state.movieData.title) ? true : false;
		this.setState({ toggleActive: isFavourite });
	}

	setMovieData(m) {
		this.setState({ movieData: { title: m.Title, id: m._id } });
	}

	// set the state to re-render on Favourite Toggle
	onToggle() {
		this.setState({ toggleActive: !this.state.toggleActive });
		if (!this.state.toggleActive) {
			this.addToFavourites(this.state.movieData.title);
		} else {
			this.removeFromFavourites();
		}
	}

	// on Toggle > add movie to favourites
	async addToFavourites() {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.put(
				`https://movie-app-3073.herokuapp.com/account/${this.props.loggedInUser}/movies/${this.state.movieData.title}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);
		} catch (error) {
			alert('There was an issue adding this movie tou your favourites. Please try again later');
			// console.log('Error adding movie to list', error);
		}
	}

	// on Toggle > add movie to favourites
	async removeFromFavourites() {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.delete(`https://movie-app-3073.herokuapp.com/account/${this.props.loggedInUser}/movies/${this.state.movieData.title}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
		} catch (error) {
			alert('There was an issue removing this movie tou your favourites. Please try again later');
			// console.log('Error removing movie from list', error);
		}
	}

	// set the state to re-render on Director or Actor Bio info
	modalShowHide(modalData) {
		this.setState({ modalView: modalData });
	}

	// separate actors for displaying more than 1 actor in the movie view
	actorDisplay(actors) {
		const newActorDisplay = actors.map((a, i) => {
			return i < actors.length - 1 ? `${a.Name}, ` : a.Name;
		});
		return newActorDisplay;
	}

	componentDidMount() {
		this.setMovieData(this.props.movie);
		this.fetchUserData();
	}

	// Displays specific details about a movie
	render() {
		const { movie, setGenre } = this.props;
		return (
			<>
				<Row className="justify-content-center movie-details pt-5 pb-5 text-white">
					<Col md={4} className="movie-image pb-3">
						<ImageLoader loaderImage={movie.imgURL_load} mainImage={movie.imgURL} alt={movie.Title} />

						{/* <img className="w-100 pl-0" src={movie.imgURL_load} alt="" /> */}
					</Col>
					<Col md={7}>
						<div>
							<h2 className="font-weight-bold mb-3">{movie.Title}</h2>
							<div className="movie-director">
								<span className="font-weight-bold">
									Directed by:
									<OverlayTrigger overlay={<Tooltip id="my-tooltip-id">More information about {movie.Director[0].Name}</Tooltip>}>
										<a href="#" onClick={() => this.modalShowHide(movie.Director[0])}>
											{' ' + movie.Director[0].Name}
										</a>
									</OverlayTrigger>
								</span>
							</div>
							<div className="movie-actors">
								<span className="font-weight-bold">Starring: </span>
								{movie.Actor.map((a, i) => (
									<OverlayTrigger key={i} overlay={<Tooltip id="my-tooltip-id">More information about {a.Name}</Tooltip>}>
										<a href="#" className="font-weight-bold" onClick={() => this.modalShowHide(a)}>
											{i < movie.Actor.length - 1 ? `${a.Name}, ` : a.Name}
										</a>
									</OverlayTrigger>
								))}
							</div>
							<div className="imdb-div d-flex  mt-3 mb-5 align-items-center">
								<img src={imdb_logo} />
								<span className="rating ml-2">{movie.imdbRating}/10</span>
							</div>
							{movie.Genre.map(({ Genre }) => (
								<OverlayTrigger key={Genre} overlay={<Tooltip id="my-tooltip-id">View a list of {Genre.toLowerCase()} movies</Tooltip>}>
									<Link to={`/genre/`} onClick={() => setGenre(Genre)}>
										<Badge bg="info" className="genre text-white mr-3 mb-1">
											{Genre}
										</Badge>
									</Link>
								</OverlayTrigger>
							))}
							<div className="mt-4">{movie.Description}</div>
							<Toggle
								onClick={this.onToggle}
								className="toggleBtn mt-4 mb-4 text-center"
								width="200px"
								height="45px"
								on={
									<span>
										Movie in Favourites <FaCheck />
									</span>
								}
								off="Add to Favourites"
								size="md"
								onstyle="success"
								offstyle="warning"
								active={this.state.toggleActive}
							/>
							<Link to={'/'}>
								<Button size="lg" className="w-100 mt-2" variant="primary">
									Back to the movies
								</Button>
							</Link>
						</div>
					</Col>
				</Row>

				<Modal show={this.state.modalView} size="lg" centered className="modal-display">
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">{this.state.modalView.Name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<img src={this.state.modalView.imgURL} />
						<p className="modal-dates">
							Born: {this.state.modalView.Born} {this.state.modalView.Died && this.state.modalView.Died !== '' ? ` - Died: ${this.state.modalView.Died}` : ''}
						</p>
						<p>{this.state.modalView.Bio}</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => this.modalShowHide(false)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ReleaseYear: PropTypes.number.isRequired,
		Director: PropTypes.array.isRequired,
		Description: PropTypes.string.isRequired,
		imdbRating: PropTypes.number.isRequired,
		imgURL: PropTypes.string.isRequired,
		Actor: PropTypes.array.isRequired,
		Genre: PropTypes.array.isRequired
	}).isRequired
};

// 	connect to the actions and dispatchers
const mapStateToProps = (state) => {
	const { loggedInUser } = state;
	return { loggedInUser };
};

export default connect(mapStateToProps, { setGenre })(MovieView);
