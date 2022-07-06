import React from 'react';
import { Nav, Navbar, NavDropdown, Dropdown, DropdownButton, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// connect to the redux actions
import { connect } from 'react-redux';
import { setSearch, setRating } from '../../actions/actions';

import { FaUserCircle } from 'react-icons/fa';

// Import styles for this view
import './navbar-view.scss';

// import navbar logo image
import logo from '../../img/site_logo_navbar.png';

// Display the navbar
function NavBarView(props) {
	// import loggedInUser prop into state, history hook for rating re-direct and creteRef hook for search bar
	const { loggedInUser, hideSearch, movieList } = props;
	const history = useHistory();
	const searchInput = React.createRef();

	const logOut = () => {
		// reset the local storage values and load page again
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.open('/', '_self');
	};
	const movieSearchList = movieList.map((m) => ({ id: m._id, name: m.Title }));

	const searchStyleObj = {
		height: '40px',
		borderRadius: '5px',
		backgroundColor: 'white',
		boxShadow: 'none',
		hoverBackgroundColor: 'none',
		color: 'black',
		fontSize: '.9rem',
		fontFamily: 'Poppins',
		iconColor: '#0f003f',
		lineColor: '#0f003f',
		placeholderColor: '#0f003f',
		clearIconMargin: '0 8px 0 0',
		zIndex: 1024
	};

	const handleOnSelect = (item) => {
		props.setSearch(item.name);
		history.push('/search/');
	};

	// set the rating value and re-route to rating page/view
	const saveRating = (rating) => {
		props.setRating(rating);
		history.push('/rating/');
	};

	return (
		<Navbar variant="dark" expand="md" className="movie-navbar pr-4">
			<Navbar.Brand>
				<Link to={'/'}>
					<img src={logo} width="110" height="auto" className="m-2 d-inline-block align-top" alt="80's Movies Logo" />
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				{hideSearch || (
					<Nav className="ms-auto ml-4">
						<DropdownButton align="end" title="Filter by Rating" className="mr-4">
							<Dropdown.Item onClick={() => saveRating(6)}>Rated 6 and Above</Dropdown.Item>
							<Dropdown.Item onClick={() => saveRating(7)}>Rated 7 and Above</Dropdown.Item>
							<Dropdown.Item onClick={() => saveRating(8)}>Rated 8 and Above</Dropdown.Item>
						</DropdownButton>
						<ReactSearchAutocomplete items={movieSearchList} onSelect={handleOnSelect} styling={searchStyleObj} autoFocus />
					</Nav>
				)}

				<Nav className="ml-auto user-profile">
					<span>
						<FaUserCircle />
					</span>
					<NavDropdown className="text-white" title={loggedInUser} align="end" id="userDropdown">
						<NavDropdown.Item href={'/account/'}>View Profile & Favourites</NavDropdown.Item>
						<Dropdown.Divider />
						<NavDropdown.Item key="lo" href="#" onClick={logOut}>
							Log Out
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

NavBarView.propTypes = {
	hideSearch: PropTypes.bool
};

// 	connect to the actions and dispatchers
const mapStateToProps = (state) => {
	const { searchFilter, loggedInUser, movieList } = state;
	return { searchFilter, loggedInUser, movieList };
};

export default connect(mapStateToProps, { setSearch, setRating })(NavBarView);
