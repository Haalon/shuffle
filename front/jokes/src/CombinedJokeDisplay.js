import React, { Component } from 'react';
import JokeAPI from './JokeAPI';
import './CombinedJokeDisplay.css';

const jokeAPI = new JokeAPI();
window.jokeAPI = jokeAPI;

class CombinedJokeDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            combinedJoke: null,
            lang: 'RU',
        };
    }

    generateNewCombinedJoke() {
        jokeAPI.generateCombinedJoke(this.state.lang)
        .then(result =>
            this.setState({ combinedJoke: result})
        );
    }

    componentDidMount() {
        this.generateNewCombinedJoke();
    }

    render() {
        if (!this.state.combinedJoke) return <div>Not loaded yet</div>;

        console.log(this.state.combinedJoke.body);
        return (
            <div className="container">
                <p className="jokeDisplay">
                    {this.state.combinedJoke.body}
                </p>
                <button onClick={e => this.generateNewCombinedJoke()}>
                    Generate new Joke
                </button>
            </div>
        )
    }
}
export default CombinedJokeDisplay;