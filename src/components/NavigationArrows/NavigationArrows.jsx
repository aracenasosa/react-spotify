import React from 'react';
import { useHistory } from 'react-router-dom';
import Style from './NavigationArrows.module.css';
import Left from '../../assets/left.svg';
import Right from '../../assets/right.svg';
import { useSpotify } from '../../context/SpotifyContext';

const NavigationArrows = () => {
    const history = useHistory();
    const { canGoForward, setCanGoForward, canGoBack, setCanGoBack } = useSpotify();

    const handleBack = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (history.length > 1) {
            history.goBack();
            setCanGoForward(true);
        }
    };

    const handleForward = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (canGoForward) {
            history.goForward();
        }
    };

    return (
        <section className={Style.leftRight}>
            <button 
                type="button"
                className={Style.arrowCircle} 
                onClick={handleBack} 
                title="Go back"
                disabled={history.length <= 1}
            >
                <img src={Left} alt="Back" />
            </button>
            <button 
                type="button"
                className={Style.arrowCircle} 
                onClick={handleForward} 
                title="Go forward"
                style={{ visibility: canGoForward ? 'visible' : 'hidden' }}
                disabled={!canGoForward}
            >
                <img src={Right} alt="Forward" />
            </button>
        </section>
    );
};

export default NavigationArrows;
