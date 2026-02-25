import React, { useState } from 'react';
import { NewReleases } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import Nav from '../Nav/Nav.jsx';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Style from './AllNewRelease.module.css';
import NewRelease from '../Home/NewReleases/NewRelease';

import { useSpotify } from '../../context/SpotifyContext';

const AllNewRelease = () => {

    const { token } = useSpotify();
    const { data: releases, loading } = NewReleases(token);
    console.log(releases);
    console.log(user);

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.release} style={{ height: releases.length < 25 ? '100vh' : '105%' }}>

                <UserProfileHeader />
                {loading ?
                    <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i> :
                    <section className={Style.section_recently}>
                        <h2 className={Style.h2}>New Releases</h2>
                        <div className={Style.recentlyContainer}>
                            {releases && releases.length > 0 ? releases.filter(r => r).map((release, idx) => (
                                <NewRelease 
                                    key={idx}
                                    release={release} 
                                />
                            )) : <p style={{color: '#fff'}}>Not Data Available</p>}
                        </div>
                    </section>
                }

            </section>

        </main>
    )
}

export default AllNewRelease
