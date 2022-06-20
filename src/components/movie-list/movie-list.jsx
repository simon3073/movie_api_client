import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';

// Import styles for this view
import './movie-list.scss';

// component passed the movie object defined ib the main view to display
export default function MovieList(props) {
	const { movies, headerText, noResultMsg } = props;

	return (
		<Container className="main-view">
			<Row className="header justify-content">
				<Col>
					<div className="p-3 font-weight-bold text-center movie-list-header">{headerText}</div>
				</Col>
			</Row>
			<Row className="justify-content-center ">
				{movies.length ? (
					movies.map((m) => (
						<Col xs={12} md={6} lg={4} key={m._id} className="mt-4">
							<MovieCard movie={m} />
						</Col>
					))
				) : (
					<div className="no-result p-3 text-center movie-list-noresult">{noResultMsg}</div>
				)}
			</Row>
		</Container>
	);
}
