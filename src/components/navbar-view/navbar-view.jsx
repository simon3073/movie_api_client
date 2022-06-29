import React from 'react';
import { Nav, Navbar, NavDropdown, Dropdown, DropdownButton, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

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
	const { loggedInUser, hideSearch } = props;
	const history = useHistory();
	const searchInput = React.createRef();

	const logOut = () => {
		// reset the local storage values and load page again
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.open('/', '_self');
	};

	// retrieve the search value and navigate to the search route
	const submitSearch = () => {
		props.setSearch(searchInput.current.value);
		history.push('/search/');
	};

	// listen for the enter press in the search field and perform search
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			submitSearch();
			e.preventDefault();
		}
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

						<Form className="d-flex mr-5">
							<InputGroup className="mr-1 search-input">
								<FormControl type="search" ref={searchInput} onKeyPress={handleKeyPress} placeholder="Enter movie name" />
								<Button variant="primary" id="search-btn" onClick={submitSearch}>
									Search
								</Button>
							</InputGroup>
						</Form>
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
	const { searchFilter, loggedInUser } = state;
	return { searchFilter, loggedInUser };
};

export default connect(mapStateToProps, { setSearch, setRating })(NavBarView);
