import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown, Dropdown, DropdownButton, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';

// Import styles for this view
import './navbar-view.scss';

// import navbar logo image
import logo from '../../img/site_logo_navbar.png';

// Display the navbar
export default function NavBarView(props) {
	const [searchTerm, setSearchTerm] = useState('');

	const logOut = () => {
		props.onLoggedOut();
	};

	return (
		<Navbar style={{ background: '#0f003fe0' }} variant="dark" expand="md" className="movie-navbar pl-5 pr-4" fixed="top">
			<Navbar.Brand>
				<Link to={'/'}>
					<img src={logo} width="110" height="auto" className="m-2 d-inline-block align-top" alt="80's Movies Logo" />
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto ml-4">
					<DropdownButton align="end" title="Filter by Rating" className="mr-4">
						<Dropdown.Item href="/rating/6">Rated 6 and Above</Dropdown.Item>
						<Dropdown.Item href="/rating/7">Rated 7 and Above</Dropdown.Item>
						<Dropdown.Item href="/rating/8">Rated 8 and Above</Dropdown.Item>
					</DropdownButton>

					<Form className="d-flex mr-5">
						<InputGroup className="mr-1 search-input">
							<FormControl type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter movie name" />
							<Button variant="primary" id="search-btn" href={`/search/${searchTerm}`}>
								Search
							</Button>
						</InputGroup>
					</Form>
				</Nav>
				<Nav className="ml-auto user-profile">
					<span>
						<FaUserCircle />
					</span>
					<NavDropdown className="text-white" title={props.username} align="end" id="userDropdown">
						<NavDropdown.Item href={`/account/${props.username}`}>View Profile & Favourites</NavDropdown.Item>
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
	username: PropTypes.string.isRequired
};
