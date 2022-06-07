import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

// Import styles for this view
import './movie-card.scss';

// import IMDB image
import imdb_logo from '../../img/imdb_logo.png';

// Displays a movie card in the main-view grid
export default class MovieCard extends Component {
	render() {
		const { movieData, onMovieClick } = this.props;

		return (
			<Card className="movie-card m-1 p-2 h-100 text-center">
				<Card.Img className="movie-thumb mx-auto mt-2" style={{ width: '100px' }} src={movieData.imgURL} />
				<Card.Body className="p-3">
					<Card.Title style={{ color: '#ffbd24' }}>
						<strong>{movieData.Title}</strong>
					</Card.Title>
					<Card.Text>
						<span className="imdb-div d-flex m-1 justify-content-center align-items-center">
							<img src={imdb_logo} />
							<span className="rating ml-2">{movieData.imdbRating}/10</span>
						</span>
					</Card.Text>
				</Card.Body>
				<Card.Footer className="p-1 mb-2">
					<Button onClick={() => onMovieClick(movieData)} className="w-100" variant="primary">
						GO TO MOVIE
					</Button>
				</Card.Footer>
			</Card>
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
