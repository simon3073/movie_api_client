import React, { Component } from 'react';

export default class MovieCard extends Component {
	render() {
		const { movieData, onMovieClick } = this.props;
		return (
			<div
				className="movie-card"
				onClick={() => {
					onMovieClick(movieData);
				}}
			>
				{movieData.Title}
			</div>
		);
	}
}
