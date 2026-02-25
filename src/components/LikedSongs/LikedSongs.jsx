import Style from './LikedSongs.module.css';
import { Link } from 'react-router-dom';
import User from '../../assets/user.jpeg';
import NavigationArrows from '../NavigationArrows/NavigationArrows';
import cx from 'classnames';
import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav.jsx';
import { LikedSongsApi, DeleteLikedSongApi, UserPlaylist, AddToPlaylist } from '../../hooks/hook';
import Heart from '../../assets/heart.svg';
import CountUp from 'react-countup';
import Song from './Song/Song';
import Reloj from '../../assets/reloj.svg';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { toast } from 'react-toastify';
toast.configure();

import { useSpotify } from '../../context/SpotifyContext';

const LikedSongs = () => {

    const { token, user, userLoading } = useSpotify();
    const [idliked, setId] = useState('');
    const [refreshLiked, setRefreshLiked] = useState(0);
    const { data: deleteLiked, loading: deleteLikedLoading, err: errLikedLoading } = DeleteLikedSongApi(idliked, token);
    const { data, loading, err } = LikedSongsApi(token, refreshLiked);
    const { data: userPlaylist } = UserPlaylist(token);
    const [playlist, setPlaylist] = useState({
        id: '',
        uri: ''
    });
    const { data: addPlaylist, loadingaddPlaylist, erraddPlaylist } = AddToPlaylist(playlist.id, token, playlist.uri);

    const removed = () => toast.info('Remove from your Liked Songs', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const playlistToast = () => toast.info('Added to playlist', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });

    useEffect(() => {
        if (deleteLiked.status === 200) {
            removed();
            setRefreshLiked(prev => prev + 1);
        }
    }, [deleteLiked])

    useEffect(() => {
        if (addPlaylist.status === 201) {
            playlistToast();
        }
    }, [addPlaylist])

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.liked} style={{ height: 'auto' }}>

                <header className={Style.header} >
                    <section className={Style.overlay}>
                        <section className={Style.innerText}>
                            <div className={Style.arrows}>

                                    <NavigationArrows />

                                <UserProfileHeader user={user} />
                            </div>
                            <div className={Style.content}>
                                <img src={Heart} className={Style.heart} />
                                <div className={Style.textContainer}>
                                    <p className={Style.type}>PLAYLIST</p>
                                    <h1>Liked Songs</h1>
                                    <div className={Style.text}>
                                        <p className={Style.name}>{user ? user.display_name : ''}</p>
                                        <div className={Style.circle} style={{ display: data ? data.length > 0 ? 'block' : 'none' : '' }}></div>
                                        <p className={Style.colorLight} style={{ display: data ? data.length > 0 ? 'block' : 'none' : '' }}>
                                            <CountUp
                                                start={0}
                                                end={data ? data.length : ''}
                                                duration={3}
                                                separator=","
                                            />
                                            {data && data.length > 1 ? ' songs' : data.length === 1 ? ' song' : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </header>

                <section className={Style.section_a}>
                    <table>
                        <thead>
                            <tr>
                                <th className={cx(Style.normaChild, Style.number)}>#</th>
                                <th className={Style.normaChild}>TITLE</th>
                                <th className={cx(Style.normaChild, Style.albumTh)}>ALBUM</th>
                                <th className={cx(Style.normaChild, Style.date)}>DATE ADDED</th>
                                <th className={Style.lastChild}><img src={Reloj} alt="Reloj img" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? data.map((song, idx) =>
                                <Song
                                    song={song}
                                    idx={idx}
                                    collaborative={data.collaborative}
                                    setId={setId}
                                    token={token}
                                    idliked={idliked}
                                    userPlaylist={userPlaylist}
                                    setPlaylist={setPlaylist}
                                    refreshLiked={refreshLiked}
                                    key={idx}
                                />) : null}
                        </tbody>
                    </table>

                    {data && data.length <= 0 ? <p style={{ color: '#fff', fontSize: '30px', textAlign: 'center', marginTop: '40px' }}>Not Data Available</p> : ''}
                </section>

            </section>

        </main>
    )
}

export default LikedSongs
