import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';

// Import styles for this view
import './movie-grid.scss';

// component passed the movie object defined ib the main view to display
export default function MovieGrid(props) {
	return (
		<Container className="main-view">
			<Row className="header justify-content">
				<Col>
					<div className=" p-3 font-weight-bold text-center" style={{ color: '#ffbd24' }}>
						{props.headerText}
					</div>
				</Col>
			</Row>
			<Row className="justify-content-center ">
				{props.movies.length ? (
					props.movies.map((m) => (
						<Col xs={12} md={6} lg={4} key={m._id} className="mt-4">
							<MovieCard movie={m} />
						</Col>
					))
				) : (
					<div className="no-result p-3 text-center" style={{ color: '#ffbd24' }}>
						{props.noResultMsg}
					</div>
				)}
			</Row>
		</Container>
	);
}

MovieGrid.propTypes = {
	movies: PropTypes.array.isRequired,
	headerText: PropTypes.string.isRequired,
	noResultMsg: PropTypes.string
};
