import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import styles for this view
import './movie-card.scss';

export default class MovieCard extends Component {
	render() {
		const { movieData, onMovieClick } = this.props;
		return (
			<div>
				<div
					onClick={() => {
						onMovieClick(movieData);
					}}
				>
					<h3>{movieData.Title}</h3>
				</div>
			</div>
		);
	}
}

MovieCard.propTypes = {
	movieData: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ReleaseYear: PropTypes.number.isRequired,
		Director: PropTypes.array.isRequired,
		Description: PropTypes.string.isRequired,
		imdbRating: PropTypes.number.isRequired,
		imgURL: PropTypes.string.isRequired,
		Actor: PropTypes.array.isRequired,
		Genre: PropTypes.array.isRequired
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired
};
