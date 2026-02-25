import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './UserProfileHeader.module.css'; // We'll create this or reuse existing styles
import UserIcon from '../../assets/user.jpeg';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { useSpotify } from '../../context/SpotifyContext';

const UserProfileHeader = ({ user }) => {
    const { logout } = useSpotify();
    const [arrow, setArrow] = useState(false);

    return (
        <section className={Style.section_0}>
            <section className={Style.user} onClick={() => setArrow(!arrow)} style={{ background: arrow ? 'rgba(151,151,151, .3)' : '' }}>
                <img className={Style.userImg} src={user && user.images && user.images.length > 0 ? user.images[0].url : UserIcon} alt={user ? user.display_name : ''} />
                <p>{user && user.display_name ? user.display_name.substring(0, 16) : 'Not Available'} <span style={{ display: user && user.display_name && user.display_name.length > 16 ? 'inline' : 'none', color: '#fff' }}>...</span></p>
                <img className={Style.arrow} src={arrow ? arrowUp : arrowDown} alt="arrow" />
            </section>
            <div className={Style.modal} style={{ display: arrow ? 'block' : 'none' }}>
                <Link to="/userProfile" style={{ textDecoration: 'none' }}>
                    <p>Account</p>
                </Link>
                <hr className={Style.hr} />
                <div onClick={logout} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <p>Log out</p>
                </div>
            </div>
        </section>
    );
};

export default UserProfileHeader;
