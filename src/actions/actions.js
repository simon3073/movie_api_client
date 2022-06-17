export const SET_MOVIES = 'SET_MOVIES';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_GENRE = 'SET_GENRE';
export const SET_RATING = 'SET_RATING';
export const SET_USER = 'SET_USER';
export const ADD_MOVIE = 'ADD_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';

export function setMovies(value) {
	return { type: SET_MOVIES, value };
}

export function setSearch(value) {
	return { type: SET_SEARCH, value };
}

export function setGenre(value) {
	return { type: SET_GENRE, value };
}

export function setRating(value) {
	return { type: SET_RATING, value };
}

export function setUser(value) {
	return { type: SET_USER, value };
}

export function addMovie(value) {
	return { type: ADD_MOVIE, value };
}

export function removeMovie(value) {
	return { type: REMOVE_MOVIE, value };
}
