import React from 'react';
import { useHistory } from 'react-router-dom';
import Style from './NavigationArrows.module.css';
import Left from '../../assets/left.svg';
import Right from '../../assets/right.svg';
import { useSpotify } from '../../context/SpotifyContext';

const NavigationArrows = () => {
    const history = useHistory();
    const { canGoForward, setCanGoForward, canGoBack, setCanGoBack } = useSpotify();

    const handleBack = () => {
        history.goBack();
        setCanGoForward(true);
    };

    const handleForward = () => {
        history.goForward();
        // Forward availability is kept until a PUSH happens (handled by context listener)
    };

    return (
        <section className={Style.leftRight}>
            <div className={Style.arrowCircle} onClick={handleBack} title="Go back">
                <img src={Left} alt="Back" />
            </div>
            <div className={Style.arrowCircle} 
                 onClick={handleForward} 
                 title="Go forward"
                 style={{ visibility: canGoForward ? 'visible' : 'hidden' }}>
                <img src={Right} alt="Forward" />
            </div>
        </section>
    );
};

export default NavigationArrows;
