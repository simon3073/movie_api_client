import React, { Component } from 'react';
import { Row, Col, Button, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Toggle from 'react-bootstrap-toggle';

// Import styles for this view
import './movie-view.scss';

// import IMDB image
import imdb_logo from '../../img/imdb_logo.png';

export default class MovieView extends Component {
	constructor() {
		super();
		this.state = { toggleActive: false };
		this.onToggle = this.onToggle.bind(this);
	}

	onToggle() {
		this.setState({ toggleActive: !this.state.toggleActive });
	}

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

	// Displays specific details about a movie
	render() {
		const { movieData, onBackClick } = this.props;
		// This view would have modal pop ups to show more information on actors and directors

		return (
			<Row className="justify-content-center movie-details pt-5 pb-5 text-white">
				<Col md={4} className="movie-image pb-3">
					<img className="w-100 pl-0" src={movieData.imgURL} alt="" />
				</Col>
				<Col md={7}>
					<div>
						<h2 className="font-weight-bold mb-3" style={{ color: '#ffbd24' }}>
							{movieData.Title}
						</h2>
						<div className="movie-director">
							<span className="font-weight-bold">
								Directed by:
								<OverlayTrigger overlay={<Tooltip id="my-tooltip-id">More information about {movieData.Director[0].Name}</Tooltip>}>
									<a href="#"> {movieData.Director[0].Name}</a>
								</OverlayTrigger>
							</span>
						</div>
						<div className="movie-actors">
							<span className="font-weight-bold">Starring: </span>
							{movieData.Actor.map((a, i) => (
								<OverlayTrigger key={i} overlay={<Tooltip id="my-tooltip-id">More information about {a.Name}</Tooltip>}>
									<a href="#" className="font-weight-bold">
										{i < movieData.Actor.length - 1 ? `${a.Name}, ` : a.Name}
									</a>
								</OverlayTrigger>
							))}
						</div>
						<div className="imdb-div d-flex  mt-3 mb-5 align-items-center">
							<img src={imdb_logo} />
							<span className="rating ml-2">{movieData.imdbRating}/10</span>
						</div>
						{movieData.Genre.map(({ Genre }) => (
							<OverlayTrigger key={Genre} overlay={<Tooltip id="my-tooltip-id">View a list of {Genre.toLowerCase()} movies</Tooltip>}>
								<a href="#">
									<Badge bg="info" className="genre text-white mr-3">
										{Genre}
									</Badge>
								</a>
							</OverlayTrigger>
						))}
						<div className="mt-4">{movieData.Description}</div>
						<Toggle
							onClick={this.onToggle}
							className="toggleBtn mt-4 mb-4 text-center"
							width="200px"
							height="45px"
							on={
								<span>
									Added! <FaCheck />
								</span>
							}
							off="Add to Favourites"
							size="md"
							onstyle="success"
							offstyle="warning"
							active={this.state.toggleActive}
						/>
						<Button onClick={() => onBackClick(null)} size="lg" className="w-100 mt-2" variant="primary">
							Back to the movies
						</Button>
					</div>
				</Col>
			</Row>
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
