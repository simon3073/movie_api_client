import React from 'react';
import { Nav, Navbar, NavDropdown, Dropdown, DropdownButton, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { setSearch, setRating } from '../../actions/actions';

import { FaUserCircle } from 'react-icons/fa';

// Import styles for this view
import './navbar-view.scss';

// import navbar logo image
import logo from '../../img/site_logo_navbar.png';

// Display the navbar
function NavBarView(props) {
	const { loggedInUser } = props;
	const history = useHistory();
	const searchInput = React.createRef();

	const logOut = () => {
		// reset the local storage values and load page again
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.open('/', '_self');
	};

	const saveSearchTerm = () => {
		props.setSearch(searchInput.current.value);
	};

	const saveRating = (rating) => {
		props.setRating(rating);
		history.push('/rating/');
	};

	return (
		<Navbar style={{ background: '#0f003fe0' }} variant="dark" expand="md" className="movie-navbar pl-5 pr-4">
			<Navbar.Brand>
				<Link to={'/'}>
					<img src={logo} width="110" height="auto" className="m-2 d-inline-block align-top" alt="80's Movies Logo" />
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto ml-4">
					<DropdownButton align="end" title="Filter by Rating" className="mr-4">
						<Dropdown.Item onClick={() => saveRating(6)}>Rated 6 and Above</Dropdown.Item>
						<Dropdown.Item onClick={() => saveRating(7)}>Rated 7 and Above</Dropdown.Item>
						<Dropdown.Item onClick={() => saveRating(8)}>Rated 8 and Above</Dropdown.Item>
					</DropdownButton>

					<Form className="d-flex mr-5">
						<InputGroup className="mr-1 search-input">
							<FormControl type="search" ref={searchInput} value={props.searchFilter} onChange={saveSearchTerm} placeholder="Enter movie name" />
							<Link to={`/search/`}>
								<Button variant="primary" id="search-btn">
									Search
								</Button>
							</Link>
						</InputGroup>
					</Form>
				</Nav>
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

const mapStateToProps = (state) => {
	const { searchFilter, loggedInUser } = state;
	return { searchFilter, loggedInUser };
};

export default connect(mapStateToProps, { setSearch, setRating })(NavBarView);
