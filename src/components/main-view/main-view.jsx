import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import NavBarView from '../navbar-view/navbar-view';
import RegisterView from '../register-view/register-view';

// Import styles for this view
import './main-view.scss';

export default class MainView extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			movies: [],
			selectedMovie: null // set the initial state to nothing clicked
		};
	}
	// Function to set movie state
	setSelectedMovie(newSelectedMovie) {
		this.setState({ selectedMovie: newSelectedMovie });
	}

	// to set user state on log in
	onLoggedIn(user) {
		this.setState({ user });
	}

	async componentDidMount() {
		try {
			const response = await axios.get('https://movie-app-3073.herokuapp.com/movies/');
			this.setState({ movies: response.data });
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const { movies, selectedMovie, user } = this.state;

		// variables for multiple UIKIT css class styles

		// Check if we have to Log in by looking at the user value
		if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

		// Check it we have any data to show and display an empty message if not
		if (movies.length === 0) return <div className="main-view" />;

		// Or else display either a movie's details or the movie list

		return (
			<>
				<NavBarView key="navbar" username={user} />
				<Container className="main-view">
					{selectedMovie ? (
						/* Create another component to display below this to show
						- other movies that star these actors
						- other movies directed by this director
					*/
						<MovieView movieData={selectedMovie} onBackClick={(newSelectedMovie) => this.setSelectedMovie(newSelectedMovie)} />
					) : (
						/* Create another component from code below to 
						- use for display all movies
						- display movies of a genre
						- display movies of a rating
					*/
						<>
							<Row className="header justify-content">
								<Col>
									<div className=" p-3 font-weight-bold text-center" style={{ color: '#ffbd24' }}>
										80s Movies
									</div>
								</Col>
							</Row>
							<Row className="justify-content-center ">
								{movies.map((movie, i) => (
									<Col xs={12} md={6} lg={4} key={movie._id} className="mt-4">
										<MovieCard
											key={movie._id}
											movieData={movie}
											onMovieClick={(newSelectedMovie) => {
												this.setSelectedMovie(newSelectedMovie);
											}}
										/>
									</Col>
								))}
							</Row>
						</>
					)}
				</Container>
			</>
		);
	}
}
