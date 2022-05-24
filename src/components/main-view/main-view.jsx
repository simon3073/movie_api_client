import React, { Component } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

export default class MainView extends Component {
	constructor() {
		super();
		this.state = {
			movies: [
				{ _id: 1.0, Title: 'Bull Durham', ReleaseYear: '1988', Director: 'Ron Shelton', Description: 'A fan who has an affair with one minor-league baseball player each season meets an up-and-coming pitcher and the experienced catcher assigned to him.', imdbRating: 7.0, imgURL: 'https://m.media-amazon.com/images/M/MV5BMzMxMDEzMWUtZDk3NS00MWRiLWJjOGMtN2Q0ZjVhZjU3ODhkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg', Genre: ['Romance', 'Sport', 'Comedy'], Actor: ['Kevin Costner'] },
				{ _id: 2.0, Title: "National Lampoon's Vacation", ReleaseYear: '1983', Director: 'Harold Ramis', Description: "The Griswold family's cross-country drive to the Walley World theme park proves to be much more arduous than they ever anticipated.", imdbRating: 7.3, imgURL: 'https://m.media-amazon.com/images/M/MV5BMmViMGQ4ZDktNzI3OC00YjVkLWJmZDgtOTI4N2FhNjhjNDVjXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_.jpg', Genre: ['Comedy', 'Adventure'], Actor: ['Chevy Chase'] },
				{ _id: 3.0, Title: 'Sixteen Candles', ReleaseYear: '1984', Director: 'John Hughes', Description: "A girls 'sweet' sixteenth birthday becomes anything but special, as she suffers from every embarrassment possible.", imdbRating: 7.0, imgURL: 'https://m.media-amazon.com/images/M/MV5BMjA3NjkzMzI2Nl5BMl5BanBnXkFtZTcwNzE5OTU3MQ@@._V1_.jpg', Genre: ['Comedy', 'Romance'], Actor: ['Molly Ringwald', 'Anthony Michael Hall'] },
				{ _id: 4.0, Title: 'The Breakfast Club', ReleaseYear: '1985', Director: 'John Hughes', Description: 'Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.', imdbRating: 7.8, imgURL: 'https://m.media-amazon.com/images/M/MV5BOTM5N2ZmZTMtNjlmOS00YzlkLTk3YjEtNTU1ZmQ5OTdhODZhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg', Genre: ['Comedy', 'Drama'], Actor: ['Molly Ringwald', 'Anthony Michael Hall'] },
				{ _id: 5.0, Title: 'Twins', ReleaseYear: '1988', Director: 'Ivan Reitman', Description: 'A movie that appears in my CareerFoundry course', imdbRating: 6.1, imgURL: 'https://m.media-amazon.com/images/M/MV5BMWUzN2VkY2ItYmQ4YS00MjFmLWJhZDQtYWY1NWQ2NTA5NDNlXkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_FMjpg_UX1000_.jpg', Genre: ['Comedy', 'Drama'], Actor: ['Arnold Schwarzenegger'] },
				{ _id: 6.0, Title: 'Weird Science', ReleaseYear: '1985', Director: 'John Hughes', Description: 'Two high school nerds use a computer program to literally create the perfect woman, but she turns their lives upside down.', imdbRating: 6.6, imgURL: 'https://m.media-amazon.com/images/M/MV5BNTE2MzkxNzExM15BMl5BanBnXkFtZTgwNzIwODQxMTE@._V1_.jpg', Genre: ['Romance', 'Sci-Fi', 'Comedy'], Actor: ['Anthony Michael Hall'] },
				{ _id: 7.0, Title: 'The Karate Kid', ReleaseYear: '1984', Director: 'John G Avildsen', Description: 'A martial arts master agrees to teach karate to a bullied teenager.', imdbRating: 7.3, imgURL: 'https://m.media-amazon.com/images/M/MV5BNTkzY2YzNmYtY2ViMS00MThiLWFlYTEtOWQ1OTBiOGEwMTdhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg', Genre: ['Family', 'Action', 'Drama'], Actor: ['Ralph Macchio'] }
			],
			selectedMovie: null // set the initial state to nothing clicked
		};
	}
	// Function to set movie state
	setSelectedMovie(newSelectedMovie) {
		this.setState({ selectedMovie: newSelectedMovie });
	}

	render() {
		const { movies, selectedMovie } = this.state;

		// Check it we have any data to show and display an empty message if not
		if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

		// Or else display either a movie's details or the movie list
		if (selectedMovie) {
			return (
				<div className="main-view">
					<MovieView movieData={selectedMovie} onBackClick={(newSelectedMovie) => this.setSelectedMovie(newSelectedMovie)} />
				</div>
			);
		} else {
			return (
				<div className="uk-grid-small uk-child-width-expand@s uk-text-center" uk-grid="true">
					{movies.map((movie) => (
						<MovieCard
							key={movie._id}
							movieData={movie}
							onMovieClick={(newSelectedMovie) => {
								this.setSelectedMovie(newSelectedMovie);
							}}
						/>
					))}
				</div>
			);
		}
	}
}
