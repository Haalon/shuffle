import React, { Component } from 'react';
import JokeAPI from './JokeAPI';
import './CombinedJokeDisplay.css';

const jokeAPI = new JokeAPI();
window.jokeAPI = jokeAPI;

class CombinedJokeDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCombinedShown: true,
            combinedJoke: null,
            lang: 'RU',
        };
    }

    componentDidMount() {
        this.generateNewCombinedJoke();
    }

    getCombinedText() {
        if (!this.state.combinedJoke) return (<span></span>);

        const destText = this.state.combinedJoke.destination.body;
        const punchline = this.state.combinedJoke.corrected_punchline;

        const combText = destText.replace(/\{.*?\}/, `|&${punchline}|`);
        const parts = combText.split('|');
        const tagParts = parts.map((txt, i) => {
            if (txt[0] === '&') return (
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

    getDisplay() {
        const textCleanup = text => text.replace(/\{|\}/g, '');
        if (this.state.isCombinedShown)
            return (
                <div className="row">
                    <div className="display">
                        {this.getCombinedText()}
                    </div>
                </div>
            )
        
        return (
            <div className="row">
                <div className="display">
                    {textCleanup(this.state.combinedJoke.source.body)}
                </div>
                <div className="display">
                    {textCleanup(this.state.combinedJoke.destination.body)}
                </div>
            </div>
        )
    }

    generateNewCombinedJoke() {
        jokeAPI.generateCombinedJoke(this.state.lang).then(result => {
            console.dir(result);
            this.setState({ combinedJoke: result, isCombinedShown: false});
        });  
    }

    combine() {
        this.setState({ isCombinedShown: true})
    }

    changeSource() {
        const dst_pk = this.state.combinedJoke.destination.pk;
        jokeAPI.generateCombinedJoke(this.state.lang, dst_pk).then(result => {
            this.setState({ combinedJoke: result});
        });  
    }

    changeDestination() {
        const src_pk = this.state.combinedJoke.source.pk;
        jokeAPI.generateCombinedJoke(this.state.lang, null, src_pk).then(result => {
            this.setState({ combinedJoke: result});
        });  
    }

    getControlButtons() {
        if (this.state.isCombinedShown) return (
            <div className="button-section">
                <div className="button" onClick={e => this.generateNewCombinedJoke()}>
                    Generate new Joke
                </div>
            </div>
        )

        return (
            <div className="button-section">
                <div className="button button_border_left" onClick={e => this.changeSource()}>
                    Change source
                </div>
                <div className="button button_border_center" onClick={e => this.combine()}>
                    Combine
                </div>
                <div className="button button_border_right" onClick={e => this.changeDestination()}>
                    Change destination
                </div>
            </div>
        )

    }


    render() {
        if (!this.state.combinedJoke) return <div>Not loaded yet</div>;

        console.log(this.state.combinedJoke.body);
        return (
            <div className="container">
                {this.getDisplay()}
                {this.getControlButtons()}
            </div>
        )
    }
}
export default CombinedJokeDisplay;