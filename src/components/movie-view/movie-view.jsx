import React, { Component } from 'react';

export default class MovieView extends Component {
	render() {
		const { movieData, onBackClick } = this.props;
		return (
			<div className="movie-view">
				<div className="movie-poster">
					<img src={movieData.imgURL} />
				</div>
				<div className="movie-title">
					<span className="label">Title: </span>
					<span className="value">{movieData.Title}</span>
				</div>
				<div className="movie-director">
					<span className="label">Directed By: </span>
					<span className="value">{movieData.Director}</span>
				</div>
				<div className="movie-actors">
					<span className="label">Starring: </span>
					<span className="value">{movieData.Actor}</span>
				</div>
				<div className="movie-rating">
					<span className="label">IMDB Rating: </span>
					<span className="value">{movieData.imdbRating}</span>
				</div>
				<div className="movie-genre">
					<span className="label">Genre: </span>
					<span className="value">{movieData.Genre}</span>
				</div>
				<div className="movie-description">
					<span className="label">Description: </span>
					<span className="value">{movieData.Description}</span>
				</div>
				<button
					onClick={() => {
						onBackClick(null);
					}}
				>
					BACK
				</button>
			</div>
		);
	}
}
