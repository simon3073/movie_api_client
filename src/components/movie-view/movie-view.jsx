import React, { Component } from 'react';

export default class MovieView extends Component {
	// Function to set movie state
	arrayExpand(array, separator) {
		const newDisplay = array.map((g, i) => {
			return i < array.length - 1 ? `${g}${separator} ` : g;
		});
		return newDisplay;
	}

	render() {
		const { movieData, onBackClick } = this.props;
		const genres = this.arrayExpand(movieData.Genre, ' /');
		const actors = this.arrayExpand(movieData.Actor, ',');
		return (
			<div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid">
				<div className="uk-card-media-left uk-cover-container">
					<img src={movieData.imgURL} alt="" uk-cover="true" />
					<canvas width="600" height="900"></canvas>
				</div>
				<div className="uk-card-body uk-padding movie-view ">
					<div className="uk-card-title ">
						<h3>{movieData.Title}</h3>
					</div>
					<div className="movie-director uk-text-bold">
						<span className="label">Directed by {movieData.Director}</span>
					</div>
					<div className="movie-actors uk-text-bold">
						<span className="label">Starring: </span>
						<span className="value">{actors}</span>
					</div>
					<div className="movie-rating uk-text-bold">
						<span className="label">IMDB Rating: </span>
						<span className="value">{movieData.imdbRating}/10</span>
					</div>
					<div className="uk-card-badge uk-label">{genres}</div>
					<div className="movie-description">{movieData.Description}</div>
					<button
						className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom uk-button-large back-button"
						onClick={() => {
							onBackClick(null);
						}}
					>
						BACK
					</button>
				</div>
			</div>
		);
	}
}
