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
            display: 'combined'
        };
    }

    generateNewCombinedJoke() {
        jokeAPI.generateCombinedJoke(this.state.lang)
        .then(result =>
            this.setState({ combinedJoke: result, display: 'combined'})
        );
    }

    componentDidMount() {
        this.generateNewCombinedJoke();
    }

    getText() {
        if (!this.state.combinedJoke) return (<span></span>);


        let text, punchline;
        switch (this.state.display) {
            case 'source': 
                text = this.state.combinedJoke.source.body;
                punchline = this.state.combinedJoke.source.punchline;
                break;
            case 'destination':
                text = this.state.combinedJoke.destination.body;
                punchline = this.state.combinedJoke.destination.punchline;
                break;
            default: 
                text = this.state.combinedJoke.destination.body;
                punchline = this.state.combinedJoke.corrected_punchline;
                break;
        }
        const combText = text.replace(/\{.*?\}/, `|&${punchline}|`);
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

    getButtionHighlight(display) {
        if (this.state.display === display) return 'button-highlight';
        
        return '';
    }

    render() {
        if (!this.state.combinedJoke) return <div>Not loaded yet</div>;

        console.log(this.state.combinedJoke.body);
        return (
            <div className="container">

                <div className="button-section button-section--top">
                    <div className={`button button_border_left ${this.getButtionHighlight('source')}`} onClick={e => this.setState({display: 'source'})}>
                        Source
                    </div>
                    <div className={`button button_border_center ${this.getButtionHighlight('combined')}`} onClick={e => this.setState({display: 'combined'})}>
                        Combined
                    </div>
                    <div className={`button button_border_right ${this.getButtionHighlight('destination')}`} onClick={e => this.setState({display: 'destination'})}>
                        Destination
                    </div>
                </div>

                <div className="display">
                    {this.getText()}
                </div>

                <div className="button-section button-section--bottom">
                    <div className="button button_border_single" onClick={e => this.generateNewCombinedJoke()}>
                        Generate new Joke
                    </div>
                </div>
            </div>
        )
    }
}
export default CombinedJokeDisplay;