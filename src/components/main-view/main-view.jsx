import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import MovieView from '../movie-view/movie-view';
import MovieGrid from '../movie-grid/movie-grid';
import LoginView from '../login-view/login-view';
import NavBarView from '../navbar-view/navbar-view';
import RegisterView from '../register-view/register-view';
import ProfileView from '../profile-view/profile-view';

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

	// to set user state on log in
	onLoggedIn(authData) {
		this.setState({ user: authData.user.Username });
		// set local data to authorised user token
		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	// to log a user out of the application
	onLoggedOut() {
		// reset the local storage and user state values and load page again
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({ user: null });
		window.open('/', '_self');
	}

	// function to retrieve the movies when a user has successfully logged in
	async getMovies(token) {
		try {
			const response = await axios.get('https://movie-app-3073.herokuapp.com/movies/', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			this.setState({ movies: response.data });
		} catch (error) {
			console.log(error);
		}
	}

	// check if there is a token in local storage to bypass the log in view
	componentDidMount() {
		const accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({ user: localStorage.getItem('user') });
			this.getMovies(accessToken);
		}
	}

	render() {
		const { movies, selectedMovie, user } = this.state;
		return (
			<>
				<Router>
					<Route
						exact
						path="/"
						render={() => {
							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView username={user} onLoggedOut={() => this.onLoggedOut()} />
									<MovieGrid movies={movies} headerText="All 80s Movies" />
								</>
							);
						}}
					/>

					<Route
						path="/movies/:movieId"
						render={({ match }) => {
							if (!user) return <Redirect to="/" />;
							return (
								<>
									<NavBarView username={user} onLoggedOut={() => this.onLoggedOut()} />
									<MovieView user={user} movie={movies.find((m) => m._id === Number(match.params.movieId))} />;
								</>
							);
						}}
					/>
					<Route
						path="/register"
						exact
						render={() => {
							if (user) return <Redirect to="/" />;
							return <RegisterView />;
						}}
					/>
					<Route
						path="/account/:username"
						render={() => {
							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView username={user} onLoggedOut={() => this.onLoggedOut()} />
									<ProfileView />;
								</>
							);
						}}
					/>

					<Route
						path="/genre/:genre"
						render={({ match }) => {
							const genrePassed = match.params.genre;
							const genreMovies = movies.filter((m) => m.Genre.some((g) => g.Genre === genrePassed));
							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView username={user} onLoggedOut={() => this.onLoggedOut()} />
									<MovieGrid movies={genreMovies} headerText={`${genrePassed} Movies`} />
								</>
							);
						}}
					/>
					<Route
						path="/rating/:rating"
						render={({ match }) => {
							const ratingPassed = match.params.rating;
							const ratedMovies = movies.filter((m) => m.imdbRating > ratingPassed);

							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView username={user} onLoggedOut={() => this.onLoggedOut()} />
									<MovieGrid movies={ratedMovies} headerText={`Movies rated above ${ratingPassed} out of 10`} noResultMsg={`Sorry, no movies above the rating of ${ratingPassed}`} />
								</>
							);
						}}
					/>
					<Route
						path="/search/:term"
						render={({ match }) => {
							const searchTerm = match.params.term;
							const searchedMovies = movies.filter((m) => m.Title.toLowerCase().includes(searchTerm));

							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView username={user} onLoggedOut={() => this.onLoggedOut()} />
									<MovieGrid movies={searchedMovies} headerText="Movie search" noResultMsg={`Sorry, no movies fit the search term \"${searchTerm}\"`} />
								</>
							);
						}}
					/>
				</Router>
			</>
		);
	}
}
