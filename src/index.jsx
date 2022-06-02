import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Container } from 'react-bootstrap';
import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyMovieApp extends React.Component {
	render() {
		return (
			<Container>
				<MainView />
			</Container>
		);
	}
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// create a root
const root = ReactDOMClient.createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyMovieApp />);
