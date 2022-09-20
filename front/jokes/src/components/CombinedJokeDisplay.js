import './CombinedJokeDisplay.css';
import { useState, useEffect, useRef } from 'react';
import { useApi } from '../api/useApi';
import {
    CSSTransition,
  } from 'react-transition-group';


function CombinedJokeDisplay(props) {
    const [lang] = useState('RU');
    const [combinedJoke, setCombinedJoke] = useState(null);
    const [animState, setAnimState] = useState(false);
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

    const nodeRef = useRef(null);
    const generateNewCombinedJoke = async () => {
        // we switch anim state
        // that causes enter animation if true, exit if false
        // but wwe use the same transitions for both
        setAnimState(!animState);
        const result = await api.generateCombinedJoke(lang);
        setDisplay('combined')
        setCombinedJoke(result);
        
    }

    useEffect(() => {
        generateNewCombinedJoke();
    }, [])

    if (!combinedJoke) return <div>Not loaded yet</div>;

    

    return (
        <div className="container">

            <div className="flex-row flex-center">
                <div className={`button button_border_single ${getButtionHighlight('source')}`} onClick={e => setDisplay('source')}>
                    Source
                </div>
                <div className={`button button_border_single ${getButtionHighlight('combined')}`} onClick={e => setDisplay('combined')}>
                    Combined
                </div>
                <div className={`button button_border_single ${getButtionHighlight('destination')}`} onClick={e => setDisplay('destination')}>
                    Destination
                </div>
            </div>
            <CSSTransition nodeRef={nodeRef} in={animState} timeout={300} classNames="display">
                <div ref={nodeRef} className="display" onClick={e => generateNewCombinedJoke()}>
                    <div>
                        {getText()}
                    </div>
                </div>
            </CSSTransition>
            

            
        </div>
    )
}

export default CombinedJokeDisplay;