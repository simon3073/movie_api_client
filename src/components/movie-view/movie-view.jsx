import React, { Component } from 'react';
import { Row, Col, Button, Badge, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Toggle from 'react-bootstrap-toggle';
import { Link } from 'react-router-dom';

// Import styles for this view
import './movie-view.scss';

// import IMDB image
import imdb_logo from '../../img/imdb_logo.png';

export default class MovieView extends Component {
	constructor() {
		super();
		this.state = {
			toggleActive: false,
			movieData: {
				title: '',
				id: ''
			},
			modalView: false,
			modalData: null,
			favList: []
		};
		this.onToggle = this.onToggle.bind(this);
		this.modalShowHide = this.modalShowHide.bind(this);
	}

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
			console.error(error);
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

	async addToFavourites() {
		try {
			const token = localStorage.getItem('token');
			const user = localStorage.getItem('user');
			const response = await axios.put(
				`https://movie-app-3073.herokuapp.com/account/${user}/movies/${this.state.movieData.title}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);
		} catch (error) {
			console.log('Error adding movie to list', error);
		}
	}

	async removeFromFavourites() {
		try {
			const token = localStorage.getItem('token');
			const user = localStorage.getItem('user');
			const response = await axios.delete(`https://movie-app-3073.herokuapp.com/account/${user}/movies/${this.state.movieData.title}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
		} catch (error) {
			console.log('Error removing movie from list', error);
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
		document.addEventListener('keypress', this.keyPressCallback);
		this.setMovieData(this.props.movie);
		this.fetchUserData();
	}

	componentWillUnmount() {
		document.removeEventListener('keypress', this.keyPressCallback);
	}

	// Displays specific details about a movie
	render() {
		const { movie, onBackClick } = this.props;
		// This view would have modal pop ups to show more information on actors and directors
		return (
			<>
				<Row className="justify-content-center movie-details pt-5 pb-5 text-white">
					<Col md={4} className="movie-image pb-3">
						<img className="w-100 pl-0" src={movie.imgURL} alt="" />
					</Col>
					<Col md={7}>
						<div>
							<h2 className="font-weight-bold mb-3" style={{ color: '#ffbd24' }}>
								{movie.Title}
							</h2>
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
									<Link to={`/genre/${Genre}`}>
										<Badge bg="info" className="genre text-white mr-3">
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
							<Button onClick={() => onBackClick()} size="lg" className="w-100 mt-2" variant="primary">
								Back to the movies
							</Button>
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
							Born: {this.state.modalView.Born} {this.state.modalView.Died !== '' ? ` - Died: ${this.state.modalView.Died}` : ''}
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
	}).isRequired,
	onBackClick: PropTypes.func.isRequired
};
