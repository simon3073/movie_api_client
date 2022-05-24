import React, { Component } from 'react';

export default class MovieCard extends Component {
	render() {
		const { movieData, onMovieClick } = this.props;
		return (
			<div
				className="movie-card uk-card uk-card-body uk-card-default uk-card-hover uk-width-1"
				onClick={() => {
					onMovieClick(movieData);
				}}
			>
				{movieData.Title}
			</div>
		);
	}
}
