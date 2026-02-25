import React, { useState, useEffect } from 'react';
import { SpecifiedPlaylist, UserPlaylist, AddToPlaylist, RemoveToPlaylist, SaveTracks, DeleteLikedSongApi } from '../../../hooks/hook';
import Style from './Playlist.module.css';
import Nav from '../Nav.jsx';
import NavigationArrows from '../../NavigationArrows/NavigationArrows';
import User from '../../../assets/user.jpeg';
import Song from './Song/Song';
import Reloj from '../../../assets/reloj.svg';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import UserProfileHeader from '../../UserProfileHeader/UserProfileHeader';
import cx from 'classnames';
import { toast } from 'react-toastify';
toast.configure();

import { useSpotify } from '../../../context/SpotifyContext';

const Playlist = ({ match: { params: { id } } }) => {

    const { token, user, userLoading } = useSpotify();
    const [idliked, setId] = useState('');
    const [idliked2, setId2] = useState('');
    const [refreshLiked, setRefreshLiked] = useState(0);
    const { data: userPlaylist } = UserPlaylist(token);

    const [playlist, setPlaylist] = useState({
        id: '',
        uri: ''
    });
    const [uriRemove, setUriRemove] = useState('');
    const { data, loading, err } = SpecifiedPlaylist(id, token, uriRemove);
    const totalTime = data.tracks && data.tracks.items.length > 0 ? data.tracks.items.map(obj => obj.track ? obj.track.duration_ms : 0).reduce((a, b) => a + b) : 0;
    const hours = Math.floor((totalTime / 60000) / 60).toFixed(0);
    const minutes = Math.floor(totalTime / 60000).toFixed(0);
    const seconds = ((totalTime % 60000) / 1000).toFixed(0);

    const { data: addPlaylist, loadingaddPlaylist, erraddPlaylist } = AddToPlaylist(playlist.id, token, playlist.uri);
    const { data: removePlaylist, loadingremovePlaylistt, errremovePlaylist } = RemoveToPlaylist(id, token, uriRemove);
    const { data: saveTracks, loading: saveTracksLoading, err: errsaveTracks } = SaveTracks(idliked, token);
    const { data: deleteLiked, loading: deleteLikedLoading, err: errLikedLoading } = DeleteLikedSongApi(idliked2, token);

    const removed = () => toast.info('Remove from your Liked Songs', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const success = () => toast.info('Added to your Liked Songs', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const playlistToast = () => toast.info('Added to playlist', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const removePlaylistToast = () => toast.info('Removed to playlist', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });

    useEffect(() => {
        if (saveTracks.status === 200) {
            success();
            setRefreshLiked(prev => prev + 1);
        }
    }, [saveTracks])

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

    useEffect(() => {
        if (removePlaylist.status === 200) {
            removePlaylistToast();
        }
    }, [removePlaylist])


    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            {!loading ?
                <section className={Style.playlist} style={{ height: data.tracks ? data.tracks.items.length < 6 ? '180vh' : '100%' : '100vh' }}>

                    <header className={Style.header} >
                        <section className={Style.overlay}>
                            <section className={Style.innerText}>
                                <div className={Style.arrows}>
                                    <NavigationArrows />

                                    <UserProfileHeader user={user} />
                                </div>

                                <div className={Style.content}>
                                    <img src={data.images && data.images.length > 0 ? data.images[0].url : User} className={Style.playlistImg} />
                                    <div className={Style.textContainer}>
                                        <p className={Style.type}>{data && data.collaborative ? 'COLLABORATIVE PLAYLIST' : 'PLAYLIST'}</p>
                                        <h1>{data ? data.name : ''}</h1>
                                        <p className={Style.description}>{data ? data.description : ''}</p>
                                        <div className={Style.text}>
                                            <p className={Style.name}>{data.owner ? data.owner.display_name : ''}</p>
                                            <div className={data.followers && data.followers.total > 0 ? Style.circle : ''}></div>
                                            <p className={Style.colorLight} style={{ display: data.followers && data.followers.total > 0 ? 'inline-block' : 'none' }}>
                                                <CountUp
                                                    start={0}
                                                    end={data.followers && data.followers.total > 0 ? data.followers.total : ''}
                                                    duration={3}
                                                    separator=","
                                                />
                                                {data.followers && data.followers.total > 0 ? data.followers.total > 1 ? ' likes' : ' like' : ''}
                                            </p>
                                            <div className={Style.circle} style={{ display: data.tracks ? data.tracks.total > 0 ? 'block' : 'none' : '' }}></div>
                                            <p className={Style.colorLight} style={{ display: data.tracks ? data.tracks.total > 0 ? 'block' : 'none' : '' }}>
                                                <CountUp
                                                    start={0}
                                                    end={data.tracks ? data.tracks.total : ''}
                                                    duration={3}
                                                    separator=","
                                                />
                                                {data.tracks && data.tracks.total > 1 ? ' songs' : ' song'},
                                            </p>
                                            <p className={Style.colorLight2} style={{ display: data.tracks ? data.tracks.total > 0 ? 'block' : 'none' : '' }}>{data.tracks ? `${minutes > 59 ? hours : minutes} ${minutes > 59 ? 'hr' : 'min'} ${minutes > 59 ? minutes - 60 < 10 ? `0${minutes - 60}` : minutes - (hours * 60) : ''} ${minutes > 59 ? '' : seconds < 10 ? `0${seconds}` : seconds} ${minutes > 59 ? 'min' : 'sec'}` : ''}</p>
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
                                    <th className={cx(Style.normaChild, Style.title)}>TITLE</th>
                                    <th className={cx(Style.normaChild, Style.erased2, Style.album)}>ALBUM</th>
                                    <th className={Style.normaChild} style={{ display: data ? data.collaborative ? '' : 'none' : 'none' }}>ADDED BY</th>
                                    <th className={cx(Style.normaChild, Style.erased, Style.date)}>DATE ADDED</th>
                                    <th className={Style.lastChild} style={{ width: '10%' }}><img src={Reloj} alt="Reloj img" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.tracks && data.tracks.items && data.tracks.items.length > 0 ? data.tracks.items.map((song, idx) =>
                                    <Song
                                        song={song}
                                        idx={idx}
                                        collaborative={data.collaborative}
                                        token={token}
                                        userPlaylist={userPlaylist}
                                        setPlaylist={setPlaylist}
                                        playlist={data}
                                        setId={setId}
                                        setId2={setId2}
                                        idliked={idliked}
                                        idliked2={idliked2}
                                        setUriRemove={setUriRemove}
                                        refreshLiked={refreshLiked}
                                        key={idx}
                                    />
                                ) : ''}
                            </tbody>
                        </table>

                        {data.tracks && data.tracks.items && data.tracks.items.length <= 0 ? <p style={{ color: '#fff', fontSize: '30px', textAlign: 'center', marginTop: '40px' }}>Not Data Available</p> : ''}
                    </section>

                </section>
                : <div style={{ textAlign: 'center', width: '100%', paddingTop: '100px' }}>
                    <i className="fas fa-sync fa-spin fa-8x" style={{ color: '#fff' }}></i>
                  </div>}

        </main>
    )
}

export default Playlist
