import React, { useState, useEffect } from 'react';
import Style from './Artist.module.css';
import { SpecificArtist, ArtistTopTrack, ObtainAlbum, Appears_On, SaveTracks, UserPlaylist, AddToPlaylist, DeleteLikedSongApi } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import NavigationArrows from '../NavigationArrows/NavigationArrows';
import verified from '../../assets/verified.svg';
import CountUp from 'react-countup';
import Nav from '../Nav/Nav.jsx';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { Link } from 'react-router-dom';
import Song from './Song/Song';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

import { useSpotify } from '../../context/SpotifyContext';

const Artist = ({ match: { params: { id } } }) => {

    const { token, user, userLoading } = useSpotify();
    const { data, loading, err } = SpecificArtist(id, token);
    const { data: topTrack, loadingTopTrack, errTopTrack } = ArtistTopTrack(id, token);
    const { data: album, loading: loadingAlbum, err: errAlbum } = ObtainAlbum(id, token);
    const { data: appears, loading: loadingAppears, err: errAppears } = Appears_On(id, token);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    return (
        <main className={Style.container} >

            <section>
                <Nav />
            </section>

            <section className={Style.main} >

                <header className={Style.header}>
                    <section className={Style.overlay}>
                        <section className={Style.innerText}>
                            <div className={Style.arrows}>
                                <NavigationArrows />
                                <UserProfileHeader user={user} />
                            </div>
                            
                            <div className={Style.content}>
                                <img src={data.images ? data.images[0].url : User} className={Style.artistCover} alt={data.name} />
                                <div className={Style.textContainer}>
                                    <div className={Style.verifiedContainer}>
                                        <img src={verified} alt="Verified" />
                                        <span>Verified Artist</span>
                                    </div>
                                    <h1>{data ? data.name : ''}</h1>
                                    <p className={Style.followers}>
                                        <CountUp
                                            start={0}
                                            end={data.followers ? data.followers.total : 0}
                                            duration={2.5}
                                            separator=","
                                        /> <span style={{marginLeft: '5px'}}>followers</span>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </section>
                </header>

                <section className={Style.section_a}>
                    <h1>Popular</h1>
                    <iframe 
                        src={`https://open.spotify.com/embed/artist/${id}?utm_source=generator&theme=0`} 
                        width="100%" 
                        height="380" 
                        frameBorder="0" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        title="Artist Top Tracks"
                        style={{ borderRadius: '12px' }}
                    ></iframe>
                </section>

                <section className={Style.section_b}>
                    <h1>Discography</h1>
                    <section className={Style.discographyContainer}>
                        {album.length > 0 ? album.map(alb => (
                            <Link to={`/album/${alb.id}`} style={{ textDecoration: 'none' }}>
                                <section className={Style.discography}>
                                    <img className={Style.artistImg} src={alb.images[0] ? alb.images[0].url : User} alt={alb.name} />

                                    <h4 className={Style.title}>{alb.name ? alb.name.substring(0, 11) : ''} <span style={{ display: alb.name !== undefined ? alb.name.length > 11 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                                    <div className={Style.discograpyText}>
                                        <span>{new Date(alb.release_date).getFullYear()}</span>
                                        <div className={Style.circle}></div>
                                        <span> {alb.album_type}</span>
                                    </div>
                                </section>
                            </Link>
                        )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                    </section>
                </section>


                <section className={Style.section_d}>
                    <h1>Appears On</h1>
                    <section className={Style.appearContainer}>
                        {appears.length > 0 ? appears.map(appear => (
                            <Link to={`/album/${appear.id}`} style={{ textDecoration: 'none' }}>
                                <section className={Style.appear}>
                                    <img className={Style.appearImg} src={appear.images[0] ? appear.images[0].url : User} alt={appear.name} />

                                    <h4>{appear.name ? appear.name.substring(0, 15) : ''} <span style={{ display: appear.name.length > 15 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                                    <div className={Style.appearText}>
                                        <span>{new Date(appear.release_date).getFullYear()}</span>
                                        <div className={Style.circle}></div>
                                        <span> {appear.album_type}</span>
                                    </div>
                                </section>
                            </Link>
                        )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                    </section>
                </section>

            </section>

        </main>
    )
}

export default Artist
