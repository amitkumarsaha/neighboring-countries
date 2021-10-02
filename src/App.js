
import './App.css';
import { Component } from 'react';
import RandomCountries from './RandomCountries';
import NeighboringCountries from './NeighboringCountries';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { countries: [] };
    this.shuffleArray=this.shuffleArray.bind(this);
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    fetch('https://travelbriefing.org/countries.json')
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.setState({
          countries: data
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  };

  // Durstenfeld shuffle, an optimized version of Fisher-Yates
  shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render() {
    const { countries } = this.state;
    const selectedCountries = this.shuffleArray(countries).slice(0, 10);

    return (
      <div className="App">
        <h2>Selected Countries</h2>
        <RandomCountries countries={selectedCountries} />
        <h2>Neighbors</h2>
        <NeighboringCountries selectedCountries={selectedCountries} />
      </div>
    );
  };

}

export default App;

