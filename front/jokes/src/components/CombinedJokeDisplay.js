import './CombinedJokeDisplay.css';
import { useState, useEffect } from 'react';
import { useApi } from '../api/useApi';


function CombinedJokeDisplay(props) {
    const [lang] = useState('RU');
    const [combinedJoke, setCombinedJoke] = useState(null)
    const [display, setDisplay] = useState('combined')
    const api = useApi();

    const getButtionHighlight = (display_) => {
        if (display === display_) return 'button-highlight';
        
        return '';
    }

    const getText = () => {
        if (!combinedJoke) return (<span></span>);


        let text, punchline;
        switch (display) {
            case 'source': 
                text = combinedJoke.source.body;
                punchline = combinedJoke.source.punchline;
                break;
            case 'destination':
                text = combinedJoke.destination.body;
                punchline = combinedJoke.destination.punchline;
                break;
            default: 
                text = combinedJoke.destination.body;
                punchline = combinedJoke.corrected_punchline;
                break;
        }
        const combText = text.replace(/\{.*?\}/, `|&${punchline}|`);
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

    const generateNewCombinedJoke = async () => {
        const result = await api.generateCombinedJoke(lang);
        setDisplay('combined')
        setCombinedJoke(result);
    }

    useEffect(() => {
        generateNewCombinedJoke();
    }, [])

    if (!combinedJoke) return <div>Not loaded yet</div>;

    console.log(combinedJoke.body);

    return (
        <div className="container">

            <div className="button-section">
                <div className={`button button_border_left ${getButtionHighlight('source')}`} onClick={e => setDisplay('source')}>
                    Source
                </div>
                <div className={`button button_border_center ${getButtionHighlight('combined')}`} onClick={e => setDisplay('combined')}>
                    Combined
                </div>
                <div className={`button button_border_right ${getButtionHighlight('destination')}`} onClick={e => setDisplay('destination')}>
                    Destination
                </div>
            </div>

            <div className="display">
                {getText()}
            </div>

            <div className="button-section button-section--bottom">
                <div className="button button_border_single" onClick={e => generateNewCombinedJoke()}>
                    Generate new Joke
                </div>
            </div>
        </div>
    )
}

export default CombinedJokeDisplay;