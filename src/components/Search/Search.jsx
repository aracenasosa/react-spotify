import React, { useState, useEffect } from 'react';
import { Artists, Track, ObtainAlbum, FeaturedPlaylist, BrowseCategories, DeleteLikedSongApi, UserPlaylist, AddToPlaylist, UserProfile, SaveTracks } from '../../hooks/hook';
import ArtistsCards from './ArtistsCards/ArtistsCards';
import Album from './Album/Album';
import FeaturedPlaylistcp from './FeaturedPlaylist/FeaturedPlaylistcp';
import Song from './Songs/Songs';
import Style from './Search.module.css';
import Nav from '../Nav/Nav.jsx';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import User from '../../assets/user.jpeg';
import Genre from '../../assets/genre.svg';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { toast } from 'react-toastify';
toast.configure();

import { useSpotify } from '../../context/SpotifyContext';

const Search = () => {

    const { token, user, userLoading, search, setSearch, isGuest } = useSpotify();
    const { data, loading, err } = Artists(search, token);
    const { data: track, loading: loadingTrack, err: errTrack } = Track(search, token);
    const { data: album, loading: loadingAlbum, err: errAlbum } = ObtainAlbum(data[0] ? data[0].id : '', token);
    const { data: playlist, loading: loadingPlaylist, err: errPlaylist } = FeaturedPlaylist(token);
    const [idliked, setId] = useState('');
    const [idliked2, setId2] = useState('');
    const [refreshLiked, setRefreshLiked] = useState(0);
    const { data: saveTracks, loading: saveTracksLoading, err: errsaveTracks } = SaveTracks(idliked, token);
    const { data: deleteLiked, loading: deleteLikedLoading, err: errLikedLoading } = DeleteLikedSongApi(idliked2, token);
    const { data: userPlaylist, loadinguserPlaylist, erruserPlaylist } = UserPlaylist(token);
    const [playlistData, setPlaylist] = useState({
        id: '',
        uri: ''
    });
    const { data: addPlaylist, loadingaddPlaylist, erraddPlaylist } = AddToPlaylist(playlistData.id, token, playlistData.uri);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isSearching = search && search.length > 0;
    const loadingSearch = loading || loadingTrack || loadingAlbum;

    /* if(localStorage.getItem('previousLocation') !== match.url) 
    {
        localStorage.setItem('currentLocation', match.url)
    } 

    console.log(localStorage.getItem('compare'), 'compare');

    console.log(localStorage.getItem('currentLocation'), 'currentLocation');
    console.log(localStorage.getItem('previousLocation'), 'previousLocation'); */

    const removed = () => toast.info('Remove from your Liked Songs', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const success = () => toast.info('Added to your Liked Songs', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const playlistToast = () => toast.info('Added to playlist', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });

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

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>

            <section className={Style.search}>

                <section className={Style.topContainer}>
                    <form >
                        <input type="text" placeholder="Search for Artists" onChange={ e => {setSearch(e.target.value); e.preventDefault();} } />

                        <UserProfileHeader user={user} />
                    </form>
                    
                    {isGuest && isSearching && (
                        <div style={{
                            backgroundColor: 'rgba(255, 193, 7, 0.15)',
                            border: '1px solid rgba(255, 193, 7, 0.5)',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            margin: '16px 0',
                            color: '#ffc107',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <i className="fas fa-info-circle"></i>
                            <span>You're viewing sample data. Search results will show the same content regardless of your query. Log in to access real Spotify data.</span>
                        </div>
                    )}
                </section>

                {isSearching ?
                    <section>
                        {loadingSearch ? 
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                                <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>
                            </div> :
                            <>
                                <section className={Style.section_a}>

                                    <section className={Style.flex}>
                                        <section className={Style.topResultSection}>
                                            <h2 className={Style.h2}>Top result</h2>
                                            <Link to={`/artist/${data && data.length > 0 ? data[0].id : ''}`} style={{ textDecoration: 'none' }}>
                                                <section className={Style.card}>
                                                    <img className={Style.artistImg} src={data[0] && data[0].images[0] ? data[0].images[0].url : User} alt={data[0] ? data[0].name : 'Artist'} />
                                                    <h4>{data[0] ? data[0].name.substring(0, 21) : ''} <span style={{ display: data[0] ? data[0].name.length > 21 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>
                                                    <div>
                                                        <p>{data[0] ? data[0].type : ''}</p>
                                                    </div>
                                                </section>
                                            </Link>
                                        </section>

                                        <section className={Style.songsContainer}>
                                            <h2 className={Style.h2Songs}>Songs</h2>
                                            <section className={Style.songList}>
                                                {track ? track.filter(song => song).map(song => <Song
                                                    idliked={idliked}
                                                    idliked2={idliked2}
                                                    setId={setId}
                                                    setId2={setId2}
                                                    song={song}
                                                    token={token}
                                                    userPlaylist={userPlaylist}
                                                    setPlaylist={setPlaylist}
                                                    refreshLiked={refreshLiked}
                                                    key={song.id} />).slice(0, 4) : <p style={{color: '#fff'}}>Not Data Available</p>}
                                            </section>
                                        </section>
                                    </section>
                                </section>

                                <section className={Style.section_b} style={{ display: data && data.length > 0 ? 'block' : 'none' }}>
                                    <div className={Style.titleContainer}>
                                        <h2 className={Style.h2}>Artists</h2>
                                        <Link to={`/allArtist/${search}`} style={{ textDecoration: 'none' }}>
                                            <p className={Style.seeAll} style={{ display: data && data.length > 8 ? 'flex' : 'none' }}>See more</p>
                                        </Link>
                                    </div>
                                    <div className={Style.section_b_grid}>
                                        {data ? data.filter(artist => artist).map(artist => <ArtistsCards artist={artist} key={artist.id} />).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                                    </div>
                                </section>

                                <section className={Style.section_c} style={{ display: album && album.length > 0 ? 'block' : 'none' }}>
                                    <div className={Style.titleContainer}>
                                        <h2 className={Style.h2}>Album</h2>
                                        <Link to={`/allAlbum/${data[0] ? data[0].id : ''}`} style={{ textDecoration: 'none' }}>
                                            <p className={Style.seeAll} style={{ display: data && data.length > 8 ? 'flex' : 'none' }}>See more</p>
                                        </Link>
                                    </div>
                                    <div className={Style.section_c_grid}>
                                        {album ? album.filter(albm => albm).map((albm, idx) => (
                                            <Album album={albm} key={idx} />
                                        )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                                    </div>
                                </section>

                                <section className={Style.section_d} style={{ display: data && data.length > 0 ? 'block' : 'none' }}>
                                    <div className={Style.titleContainer}>
                                        <h2 className={Style.h2}>Playlist</h2>
                                        <Link to="/allFeaturedPlaylist" style={{ textDecoration: 'none' }}>
                                            <p className={Style.seeAll} style={{ display: data && data.length > 8 ? 'flex' : 'none' }}>See more</p>
                                        </Link>
                                    </div>
                                    <div className={Style.section_d_grid}>
                                        {playlist ? playlist.filter(play => play).map((play, idx) => (
                                            <FeaturedPlaylistcp playlist={play} key={idx} />
                                        )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                                    </div>
                                </section>
                            </>
                        }
                    </section>
                    :
                    <section className={Style.emptySearch}>
                        <div className={Style.emptySearchContent}>
                            <i className="fas fa-search fa-5x"></i>
                            <h1>Search for your favorite music</h1>
                            <p>Discover artists, albums, or songs and dive into a world of sound.</p>
                        </div>
                    </section>
                }
            </section>
        </main>
    )
}

export default Search
