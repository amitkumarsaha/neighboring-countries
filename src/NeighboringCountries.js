import { Component } from "react";

class NeighboringCountries extends Component{

    constructor(props) {
        super(props);
        this.state = { countries: [] };
        this.findNeighbors=this.findNeighbors.bind(this);
      }


    findNeighbors(selectedCountries){

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true'},
        };

        selectedCountries.map(country => (
            fetch(country.url, requestOptions)
            .then(async response => {
                const data = await response.json();
        
                // check for error response
                if (!response.ok) {
                  // get error message from body or default to response statusText
                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
                }
        
                this.setState({
                  countries: {
                      name: data.names.name,
                      neighbors: data.neighbors
                  }
                })
              })
              .catch(error => {
                console.log(error)
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
              })
        ));
    }

    render() {
        const selectedCountries = this.props.selectedCountries;
        this.findNeighbors(selectedCountries);
        const { countries } = this.state;

        return(
            <div>
                    {countries.map(country => (
                        <li key={country.name}>
                            {country.name}
                            {country.neighbors}
                        </li>
                    ))}
            </div>
        );
    };
}

export default NeighboringCountries;