import React, { useState } from 'react';
import Nav from '../Nav/Nav.jsx';
import Style from './AllPlaylist.module.css';
import { UserPlaylist } from '../../hooks/hook';
import Playlist from './Playlist/Playlist';
import User from '../../assets/user.jpeg';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { useSpotify } from '../../context/SpotifyContext';

const AllPlaylist = () => {

    const { token, user } = useSpotify();
    const { data, loading } = UserPlaylist(token);

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>

            <section className={Style.playlists}>

                <section className={Style.topHeader}>
                    <UserProfileHeader user={user} />
                </section>

                {!loading ?
                    <section className={Style.section_a}>
                        <h2 className={Style.h2}>Playlists</h2>
                        <div className={Style.flex}>
                            {data && data.length > 0 ? data.map((playlist, idx) => <Playlist token={token} playlist={playlist} key={idx} />) : <p style={{color: '#fff'}}>Not Data Available</p>}
                        </div>
                    </section>
                    : (
                        <div className={Style.loadingContainer}>
                            <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>
                        </div>
                    )}
            </section>

        </main>
    )
}

export default AllPlaylist
