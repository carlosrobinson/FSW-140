import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    movies: [], 
    movie: {
      title: '',
      genre: '',
      release_date: ''
    }
  }

componentDidMount() {
  this.getMovies();
}

getMovies = _ => {
  fetch('http://localhost:5000/movies')
  .then(response => response.json())
  .then(response => this.setState({movies: response.data}))
  .catch(err => console.error(err))
}

addMoives = _=> { 
  const {movie} = this.state;
  fetch(`http://localhost:5000/movies/add?title=${movie.title}&genre=${movie.genre}&release_date=${movie.release_date}`)
    .then(this.getMovies)
    .catch(err => console.error(err))
}

  renderMovie = ({movies_id, title, genre, release_date}) => 
  <div className= "movies" key= {movies_id}>

    <h1>{title}</h1> 
    <h3>{genre}</h3>
    <h5>{release_date}</h5>
    <br/>
    <hr/>
  </div>

  render() {
    const {movies, movie} = this.state
    return (
      <div className="App">
        <div className="addMovie">
    <h1 className= "title">Movie Database</h1>
          <input 
          value= {movie.title} 
          onChange= {e => this.setState({movie: {...movie, title: e.target.value}})}
          placeholder= 'Title'
          /> 
          <input  
          value= {movie.genre} 
          onChange= {e => this.setState({movie: {...movie, genre: e.target.value}})}
          placeholder= "Genre"
          />
          <input  
          value= {movie.release_date} 
          onChange= {e => this.setState({movie: {...movie, release_date: e.target.value}})}
          placeholder= "Release Date"
          />
          <button onClick ={this.addMoives}>Add movies</button>
        </div>
          {movies.map(this.renderMovie)}
      </div>
    )

    }
}

export default App;
