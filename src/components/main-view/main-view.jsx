import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// connect to the redux actions
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import MovieList from '../movie-list/movie-list';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import NavBarView from '../navbar-view/navbar-view';
import RegisterView from '../register-view/register-view';
import ProfileView from '../profile-view/profile-view';

// Import styles for this view
import './main-view.scss';

class MainView extends Component {
	// to set user state on log in
	onLoggedIn() {
		this.getMovies();
	}

	// function to retrieve the movies when a user has successfully logged in
	async getMovies() {
		const accessToken = localStorage.getItem('token');
		try {
			const response = await axios.get('https://movie-app-3073.herokuapp.com/movies/', {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			this.props.setMovies(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	// check if there is a token in local storage to bypass the log in view
	componentDidMount() {
		const accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.props.setUser(localStorage.getItem('user'));
			this.getMovies(accessToken);
		}
	}

	render() {
		const { movies, searchFilter, ratingFilter, genreFilter, loggedInUser } = this.props;
		return (
			<>
				<Router>
					<Route
						exact
						path="/"
						render={() => {
							if (!loggedInUser) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView />
									<MovieList movies={movies} headerText="All 80s Movies" />
								</>
							);
						}}
					/>

					<Route
						path="/movies/:movieId"
						render={({ match }) => {
							if (!loggedInUser) return <Redirect to="/" />;
							return (
								<>
									<NavBarView />
									<MovieView user={loggedInUser.user} movie={movies.find((m) => m._id === Number(match.params.movieId))} />;
								</>
							);
						}}
					/>
					<Route
						path="/register"
						exact
						render={() => {
							if (loggedInUser) return <Redirect to="/" />;
							return <RegisterView />;
						}}
					/>

					<Route
						path="/account/"
						render={() => {
							if (!loggedInUser) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							console.log('account page');
							return (
								<>
									<NavBarView />
									<ProfileView />;
								</>
							);
						}}
					/>

					<Route
						path="/genre/"
						render={() => {
							let filteredMovies = movies;
							if (genreFilter !== '') {
								filteredMovies = movies.filter((m) => m.Genre.some((g) => g.Genre === genreFilter));
							}
							if (!loggedInUser) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView />
									<MovieList movies={filteredMovies} headerText={`${genreFilter} Movies`} />
								</>
							);
						}}
					/>
					<Route
						path="/rating/"
						render={() => {
							let filteredMovies = movies;
							if (ratingFilter !== '') {
								filteredMovies = movies.filter((m) => m.imdbRating > ratingFilter);
							}
							if (!loggedInUser) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView />
									<MovieList movies={filteredMovies} headerText={`Movies rated above ${ratingFilter} out of 10`} noResultMsg={`Sorry, no movies above the rating of ${ratingFilter}`} />
								</>
							);
						}}
					/>
					<Route
						path="/search/"
						render={() => {
							let filteredMovies = movies;
							if (searchFilter !== '') {
								filteredMovies = movies.filter((m) => m.Title.toLowerCase().includes(searchFilter.toLowerCase()));
							}
							if (!loggedInUser) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return (
								<>
									<NavBarView />
									<MovieList movies={filteredMovies} headerText="Movie search" noResultMsg={`Sorry, no movies fit the search term \"${searchFilter}\"`} />
								</>
							);
						}}
					/>
				</Router>
			</>
		);
	}
}

// 	connect to the actions and dispatchers
const mapStateToProps = (state) => {
	const { movies, searchFilter, ratingFilter, genreFilter, loggedInUser } = state;
	return {
		loggedInUser,
		ratingFilter,
		genreFilter,
		movies,
		searchFilter
	};
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
