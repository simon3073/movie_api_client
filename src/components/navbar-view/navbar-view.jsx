import React from 'react';
import { Nav, Navbar, NavDropdown, Dropdown, DropdownButton, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';

// Import styles for this view
import './navbar-view.scss';

// import navbar logo image
import logo from '../../img/site_logo_navbar.png';

// Display the navbar
export default function NavBarView(props) {
	const logOut = () => {
		props.onLoggedOut();
	};

	return (
		<Navbar style={{ background: '#0f003fe0' }} variant="dark" expand="md" className="movie-navbar pl-5 pr-4" fixed="top">
			<Navbar.Brand>
				<img src={logo} width="110" height="auto" className="m-2 d-inline-block align-top" alt="80's Movies Logo" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto ml-4">
					<DropdownButton align="end" title="Filter by Rating" className="mr-4">
						<Dropdown.Item href="#/">Rated 6 and over</Dropdown.Item>
						<Dropdown.Item href="#/">Rated 7 and over</Dropdown.Item>
						<Dropdown.Item href="#/">Rated 8 and over</Dropdown.Item>
						<Dropdown.Item href="#/">Rated 9 and over</Dropdown.Item>
					</DropdownButton>

					<Form className="d-flex mr-5">
						<InputGroup className="mr-1">
							<FormControl type="search" placeholder="Enter movie name" />
							<Button variant="primary" id="search-btn">
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
						<NavDropdown.Item key="vp" href="#">
							View Profile
						</NavDropdown.Item>
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
