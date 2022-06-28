import { combineReducers } from 'redux';

import { SET_SEARCH, SET_MOVIES, SET_GENRE, SET_RATING, SET_USER, UPDATE_USER, DELETE_USER } from '../actions/actions';

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

function movieList(state = [], action) {
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
		case UPDATE_USER:
			return action.value;
		case DELETE_USER:
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
	movieList
});

export default moviesApp;
