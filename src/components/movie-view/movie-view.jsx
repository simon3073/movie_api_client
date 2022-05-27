import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import styles for this view
import './movie-view.scss';

export default class MovieView extends Component {
	// separate genres for display
	genreDisplay(genres) {
		const newGenreDisplay = genres.map((g, i) => {
			return i < genres.length - 1 ? `${g.Genre} / ` : g.Genre;
		});
		return newGenreDisplay;
	}

	// separate actors for display
	actorDisplay(actors) {
		const newActorDisplay = actors.map((a, i) => {
			return i < actors.length - 1 ? `${a.Name},` : a.Name;
		});
		return newActorDisplay;
	}

	componentDidMount() {
		document.addEventListener('keypress', this.keyPressCallback);
	}

	componentWillUnmount() {
		document.removeEventListener('keypress', this.keyPressCallback);
	}

	render() {
		const { movieData, onBackClick } = this.props;
		console.log('🚀 ~ file: movie-view.jsx ~ line 31 ~ MovieView ~ render ~ movieData', movieData);
		//const genres = this.genreDisplay(movieData.Genre); // add a / in between each genre
		const actors = this.actorDisplay(movieData.Actor); // add a , in between each actor

		return (
			<div className="uk-flex uk-flex-center ">
				<div className="uk-card uk-card-default uk-width-5-6s uk-width-3-4 movie-view uk-animation-slide-top ">
					<img src={movieData.imgURL} alt="" />
					<div className="uk-card-body uk-padding-small movie-view-info">
						<button className="btn-profile uk-button uk-button-primary uk-margin-small-bottom uk-button-small uk-position-top-right" uk-tooltip="Go To Profile Page">
							<span uk-icon="user"></span>
						</button>
						<button className="btn-favourites uk-button uk-button-danger uk-margin-small-bottom uk-button-small" uk-tooltip="Add to favourites">
							<span uk-icon="star"></span>
						</button>
						<div className="uk-card-title ">
							<h1 className="uk-text-bold">{movieData.Title}</h1>
						</div>
						<div className="movie-director uk-text-bold">
							<span className="label">Directed by {movieData.Director[0].Name}</span>
						</div>
						<div className="movie-actors uk-text-bold">
							<span className="label">Starring: </span>
							<span className="value">{actors}</span>
						</div>
						<div className="movie-rating uk-text-bold">
							<span className="label">IMDB Rating: </span>
							<span className="value">{movieData.imdbRating}/10</span>
						</div>
						{movieData.Genre.map(({ Genre }) => (
							<a href="#" uk-tooltip={'View a list of ' + Genre.toLowerCase() + ' movies'}>
								<span class="uk-label genres">{Genre}</span>
							</a>
						))}
						<div className="movie-description">{movieData.Description}</div>
						<button
							className="uk-margin-small-top uk-button uk-button-primary uk-width-1 uk-margin-small-bottom uk-button-large back-button"
							onClick={() => {
								onBackClick(null);
							}}
						>
							BACK
						</button>
					</div>
				</div>
			</div>
		);
	}
}

MovieView.propTypes = {
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
	onBackClick: PropTypes.func.isRequired
};
