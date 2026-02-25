import React, { useState, useEffect } from 'react';
import Style from './SpecificAlbum.module.css';
import Nav from '../Nav/Nav.jsx';
import { Album, SpecificArtist, ObtainAlbum, SaveTracks, DeleteLikedSongApi, AddToPlaylist, UserPlaylist } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import NavigationArrows from '../NavigationArrows/NavigationArrows';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import CountUp from 'react-countup';
import Song from './Song/Song';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { toast } from 'react-toastify';
toast.configure();

import { useSpotify } from '../../context/SpotifyContext';

const SpecificAlbum = ({ match: { params: { id } } }) => {

    const { token, user, userLoading } = useSpotify();
    const { data, loading, err } = Album(id, token);
    const { data: artist, loadingArtist, errArtist } = SpecificArtist(data.artists ? data.artists[0].id : '', token);
    const { data: album, loading: loadingAlbum, err: errAlbum } = ObtainAlbum(data.artists ? data.artists[0].id : '', token);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.main} >
                {!loading ?
                    <section>
                        <header className={Style.header}>
                            <section className={Style.overlay}>
                                <section className={Style.innerText}>
                                    <div className={Style.arrows}>
                                        <NavigationArrows />
                                        <UserProfileHeader user={user} />
                                    </div>
                                    <div className={Style.content}>
                                        <img src={data.images && data.images.length > 0 ? data.images[0].url : User} className={Style.albumImg} alt={data.name} />
                                        <div className={Style.textContainer}>
                                            <p className={Style.type}>{data ? data.album_type : 'ALBUM'}</p>
                                            <h1>{data ? data.name : ''}</h1>
                                            <div className={Style.text}>
                                                <p className={Style.name}>{data.artists ? data.artists[0].name : ''}</p>
                                                <div className={Style.circle}></div>
                                                <p className={Style.colorLight}>{data.release_date ? new Date(data.release_date).getFullYear() : ''}</p>
                                                <div className={Style.circle}></div>
                                                <p className={Style.colorLight}>{data.total_tracks} songs</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </section>
                        </header>

                        <section className={Style.section_a}>
                            <iframe 
                                src={`https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`} 
                                width="100%" 
                                height="380" 
                                frameBorder="0" 
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                loading="lazy"
                                style={{ borderRadius: '12px' }}
                            ></iframe>
                        </section>

                        <section className={Style.section_b}>
                            <div className={Style.titleContainer}>
                                <h1>More by {data.artists ? data.artists[0].name : ''}</h1>
                                <a href={`/allAlbum/${data && data.artists ? data.artists[0].id : ''}`} style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: album && album.length > 8 ? 'block' : 'none' }}>See All</p>
                                </a>
                            </div>
                            <section className={Style.albumContainer}>
                                {!loadingAlbum ? (
                                    album && album.length > 0 ? album.map(alb => (
                                        <a href={`/album/${alb.id}`} style={{ textDecoration: 'none' }} key={alb.id}>
                                            <section className={Style.album}>
                                                <img className={Style.artistImg} src={alb.images[0] ? alb.images[0].url : User} alt={alb.name} />

                                                <h4>{alb.name ? alb.name.substring(0, 15) : ''} <span style={{ display: alb.name.length > 15 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                                                <div className={Style.albumText}>
                                                    <span>{new Date(alb.release_date).getFullYear()}</span>
                                                    <div className={Style.circleCard}></div>
                                                    <span> {alb.album_type}</span>
                                                </div>
                                            </section>
                                        </a>
                                    )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>
                                ) : <i className={cx('fas fa-sync fa-spin fa-3x', Style.loadingSmall)}></i>}
                            </section>
                        </section>
                    </section>
                    : <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>}
            </section>

        </main >
    )
}

export default SpecificAlbum
