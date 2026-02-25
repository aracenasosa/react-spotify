import React, { useState } from 'react';
import Style from './AllRecentlyPlayed.module.css';
import { UserRecentlyPlayed } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import Nav from '../Nav/Nav.jsx';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { Link } from 'react-router-dom';
import RecentlyPlayed from '../Home/RecentlyPlayed/RecentlyPlayed';
import cx from 'classnames';

import { useSpotify } from '../../context/SpotifyContext';

const AllRecentlyPlayed = () => {

    const { token } = useSpotify();
    const { data: recentlyPlayed, loading: loadingRecentlyPlayed } = UserRecentlyPlayed(token);

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.recently} style={{ height: recentlyPlayed.length < 25 ? '100vh' : '105%' }}>

                <UserProfileHeader />
                {loadingRecentlyPlayed ?
                    <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i> :
                    <section className={Style.section_recently}>
                        <h2 className={Style.h2}>Recently Played</h2>
                        <div className={Style.recentlyContainer}>
                            {recentlyPlayed && recentlyPlayed.length > 0 ? recentlyPlayed.filter(r => r && r.track).map((recently, idx) => (
                                <RecentlyPlayed 
                                    key={idx}
                                    recentlyPlayed={recently} 
                                    token={token}
                                />
                            )) : <p style={{color: '#fff'}}>Not Data Available</p>}
                        </div>
                    </section>
                }

            </section>

        </main>
    )
}

export default AllRecentlyPlayed
