import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './UserProfileHeader.module.css'; // We'll create this or reuse existing styles
import UserIcon from '../../assets/user.jpeg';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { useSpotify } from '../../context/SpotifyContext';

const UserProfileHeader = ({ user }) => {
    const { logout, isGuest, exitGuestMode } = useSpotify();
    const [arrow, setArrow] = useState(false);

    const handleLogoutOrExit = () => {
        if (isGuest) {
            exitGuestMode();
        } else {
            logout();
        }
    };

    return (
        <section className={Style.section_0}>
            <section className={Style.user} onClick={() => setArrow(!arrow)} style={{ background: arrow ? 'rgba(151,151,151, .3)' : '' }}>
                <img className={Style.userImg} src={user && user.images && user.images.length > 0 ? user.images[0].url : UserIcon} alt={user ? user.display_name : ''} />
                <p>
                    {isGuest ? 'Guest User' : (user && user.display_name ? user.display_name.substring(0, 16) : 'Not Available')}
                    {isGuest && <span className={Style.guestBadge}>GUEST</span>}
                    <span style={{ display: user && user.display_name && user.display_name.length > 16 ? 'inline' : 'none', color: '#fff' }}>...</span>
                </p>
                <img className={Style.arrow} src={arrow ? arrowUp : arrowDown} alt="arrow" />
            </section>
            <div className={Style.modal} style={{ display: arrow ? 'block' : 'none' }}>
                {!isGuest && (
                    <>
                        <Link to="/userProfile" style={{ textDecoration: 'none' }}>
                            <p>Account</p>
                        </Link>
                        <hr className={Style.hr} />
                    </>
                )}
                {isGuest && (
                    <>
                        <div onClick={exitGuestMode} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <p>Log in with Spotify</p>
                        </div>
                        <hr className={Style.hr} />
                    </>
                )}
                <div onClick={handleLogoutOrExit} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <p>{isGuest ? 'Exit Guest Mode' : 'Log out'}</p>
                </div>
            </div>
        </section>
    );
};

export default UserProfileHeader;
