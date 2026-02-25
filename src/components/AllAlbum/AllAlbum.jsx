import React, { useState, useEffect } from 'react';
import Style from './AllAlbum.module.css';
import { ObtainAlbum } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import Nav from '../Nav/Nav.jsx';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { Link } from 'react-router-dom';
import Albumcp from '../Search/Album/Album';
import cx from 'classnames';

import { useSpotify } from '../../context/SpotifyContext';

const AllAlbum = ({ match: { params: { id } } }) => {

    const { token } = useSpotify();
    const { data, loading } = ObtainAlbum(id, token);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    console.log(data, 'data');
    console.log(id, 'id');

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.allAlbum} style={{ height: data.length < 25 ? '100vh' : '105%' }}>

                <UserProfileHeader />
                {loading ?
                    <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i> :
                    <section className={Style.section_recently}>
                        <h2 className={Style.h2}>Album</h2>
                        <div className={Style.recentlyContainer}>
                            {data && data.length > 0 ? data.filter(a => a).map((albm, idx) => (
                                <iframe 
                                    key={idx}
                                    src={`https://open.spotify.com/embed/album/${albm.id}?utm_source=generator&theme=0`} 
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
                }

            </section>

        </main>
    )
}

export default AllAlbum
