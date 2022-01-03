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

    getText() {
        if (!this.state.combinedJoke) return (<span></span>);

        const destText = this.state.combinedJoke.destination.body;
        const punchline = this.state.combinedJoke.corrected_punchline;

        const combText = destText.replace(/\{.*?\}/, `|&${punchline}|`);
        const parts = combText.split('|');
        const tagParts = parts.map((txt, i) => {
            if (txt[0] == '&') return (
                <u key={i}>
                    {txt.slice(1)}
                </u>
            )
            return (
                <span key={i}>
                    {txt}
                </span>
            )
        })

        return tagParts;
    }


    render() {
        if (!this.state.combinedJoke) return <div>Not loaded yet</div>;

        console.log(this.state.combinedJoke.body);
        return (
            <div className="container">
                <div className="display">
                    {this.getText()}
                </div>
                <div className="button-section">
                    <div className="button button_border_left">
                        Show origin
                    </div>
                    <div className="button button_border_center" onClick={e => this.generateNewCombinedJoke()}>
                        Generate new Joke
                    </div>
                    <div className="button button_border_right">
                        Show destination
                    </div>
                </div>
            </div>
        )
    }
}
export default CombinedJokeDisplay;