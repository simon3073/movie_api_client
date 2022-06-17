import { combineReducers } from 'redux';

import { SET_SEARCH, SET_MOVIES, SET_GENRE, SET_RATING, SET_USER, ADD_MOVIE, REMOVE_MOVIE } from '../actions/actions';

function searchFilter(state = '', action) {
	switch (action.type) {
		case SET_SEARCH:
			return action.value;
		default:
			return state;
	}
}

function genreFilter(state = '', action) {
	switch (action.type) {
		case SET_GENRE:
			return action.value;
		default:
			return state;
	}
}

function ratingFilter(state = '', action) {
	switch (action.type) {
		case SET_RATING:
			return action.value;
		default:
			return state;
	}
}

function movies(state = [], action) {
	switch (action.type) {
		case SET_MOVIES:
			return action.value;
		default:
			return state;
	}
}

function loggedInUser(state = '', action) {
	switch (action.type) {
		case SET_USER:
			return action.value;
		case ADD_MOVIE:
			return action.value;
		case REMOVE_MOVIE:
			return action.value;
		default:
			return state;
	}
}

const moviesApp = combineReducers({
	loggedInUser,
	genreFilter,
	ratingFilter,
	searchFilter,
	movies
});

export default moviesApp;
