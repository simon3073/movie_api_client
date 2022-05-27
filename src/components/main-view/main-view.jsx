import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
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

		// Check if we have to Log in by looking at the user value
		if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

		// Check it we have any data to show and display an empty message if not
		if (movies.length === 0) return <div className="main-view" />;

		// Or else display either a movie's details or the movie list
		if (selectedMovie) {
			return <MovieView movieData={selectedMovie} onBackClick={(newSelectedMovie) => this.setSelectedMovie(newSelectedMovie)} />;
		} else {
			return (
				<div className="movie-grid uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center uk-padding-small uk-animation-fade uk-position-top" uk-grid="true">
					{movies.map((movie) => (
						<MovieCard
							key={movie._id}
							movieData={movie}
							onMovieClick={(newSelectedMovie) => {
								this.setSelectedMovie(newSelectedMovie);
							}}
						/>
					))}
				</div>
			);
		}
	}
}
