import React, { useState } from 'react';
import Style from './AllArtist.module.css';
import { Artists } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import Nav from '../Nav/Nav.jsx';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { Link } from 'react-router-dom';
import ArtistsCards from '../Search/ArtistsCards/ArtistsCards';
import cx from 'classnames';

import { useSpotify } from '../../context/SpotifyContext';

const AllArtist = ({ match: { params: { search } } }) => {

    const { token } = useSpotify();
    const { data, loading } = Artists(search, token);
    /*console.log(data, 'data');
    console.log(searchParam, 'paramsmsmsm!');*/

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.allArtist} style={{ height: (data && data.length < 25) ? '100vh' : '105%' }}>

                <UserProfileHeader />
                {!loading ?
                    <section className={Style.section_recently}>
                        <h2 className={Style.h2}>Artists found for "{search}"</h2>
                        <div className={Style.recentlyContainer}>
                            {data && data.length > 0 ? data.filter(a => a).map(artist => (
                                <iframe 
                                    key={artist.id}
                                    src={`https://open.spotify.com/embed/artist/${artist.id}?utm_source=generator&theme=0`} 
                                    width="100%" 
                                    height="152" 
                                    frameBorder="0" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy"
                                    style={{ borderRadius: '12px' }}
                                ></iframe>
                            )) : <p style={{color: '#fff'}}>Not Data Available</p>}
                        </div>
                    </section>
                    : <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>}

            </section>

        </main>
    )
}

export default AllArtist
