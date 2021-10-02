import { Component } from "react";

class RandomCountries extends Component {

    render() {

        return (
            <div>
                <ul>
                    {this.props.countries.map(country => (
                        <li key={country.name}>
                            {country.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}

export default RandomCountries;