import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import styles for this view
import './movie-view.scss';

export default class MovieView extends Component {
	// separate actors for display
	actorDisplay(actors) {
		const newActorDisplay = actors.map((a, i) => {
			return i < actors.length - 1 ? `${a.Name}, ` : a.Name;
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
		//console.log('🚀 ~ file: movie-view.jsx ~ line 31 ~ MovieView ~ render ~ movieData', movieData);
		//const genres = this.genreDisplay(movieData.Genre); // add a / in between each genre
		const actors = this.actorDisplay(movieData.Actor); // add a , in between each actor

		return (
			<div>
				<img src={movieData.imgURL} alt="" />
				<div>
					<button>Go To My Profile</button>
					<button>Add to favourites</button>
					<h1 className="uk-text-bold">{movieData.Title}</h1>
					<div className="movie-director">
						<span className="label">Directed by {movieData.Director[0].Name}</span>
					</div>
					<div className="movie-actors">
						<span className="label">Starring: </span>
						<span className="value">{actors}</span>
					</div>
					<div className="movie-rating">
						<span className="label">IMDB Rating: </span>
						<span className="value">{movieData.imdbRating}/10</span>
					</div>
					{movieData.Genre.map(({ Genre }) => (
						<a href="#">
							<span class="genres">{Genre}</span>
						</a>
					))}
					<div className="movie-description">{movieData.Description}</div>
					<button
						onClick={() => {
							onBackClick(null);
						}}
					>
						BACK TO MOVIES
					</button>
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
