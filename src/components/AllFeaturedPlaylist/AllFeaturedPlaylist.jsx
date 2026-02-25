import React, { useState } from 'react';
import { FeaturedPlaylist } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import Nav from '../Nav/Nav.jsx';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { Link } from 'react-router-dom';
import FeaturedPlaylistcp from '../Search/FeaturedPlaylist/FeaturedPlaylistcp';
import cx from 'classnames';
import Style from './AllFeaturedPlaylist.module.css';

import { useSpotify } from '../../context/SpotifyContext';

const AllFeaturedPlaylist = () => {

    const { token } = useSpotify();
    const { data: featuredPlaylist, loading: loadingFeaturedPlaylist } = FeaturedPlaylist(token);
    console.log(featuredPlaylist);


    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.recently}>

                <UserProfileHeader />
                {loadingFeaturedPlaylist ?
                    <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i> :
                    <section className={Style.section_recently}>
                        <h2 className={Style.h2}>Featured Playlist</h2>
                        <div className={Style.recentlyContainer}>
                            {featuredPlaylist && featuredPlaylist.length > 0 ? featuredPlaylist.filter(p => p).map((play, idx) => (
                                <FeaturedPlaylistcp 
                                    key={idx}
                                    playlist={play} 
                                />
                            )) : <p style={{color: '#fff'}}>Not Data Available</p>}
                        </div>
                    </section>
                }

            </section>

        </main>
    )
}

export default AllFeaturedPlaylist
