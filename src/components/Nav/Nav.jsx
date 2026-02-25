import React, { useEffect, useState } from 'react';
import Style from './Nav.module.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/spotifyLogo.svg';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import PalitoIcon from '../../assets/palitos.svg';
import Cruz from '../../assets/cruz.svg';
import Heart from '../../assets/heart.svg';
import Collaborite from '../../assets/collaborite.svg';
import { UserPlaylist } from '../../hooks/hook';

import { useSpotify } from '../../context/SpotifyContext';

function Nav() {
    const { token, setSearch, isGuest } = useSpotify();
    const { data } = UserPlaylist(token);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkStyle = (active) => ({
        background: active ? 'rgb(40,40,40)' : 'none'
    });

    const spanStyle = (active) => ({
        color: active ? '#fff' : 'none'
    });

    const isHome = isActive('/home');
    const isSearch = isActive('/search');
    const isLibrary = isActive('/playlists');

    const [ menu, setMenu ] = useState(true);

    return (
        <nav className={Style.nav}>
            <section className={Style.container}>
                <div className={Style.logo}>
                    <img src={Logo} alt="Spotify Logo" />
                    <div className={Style.hamburguerMenu} onClick={() => setMenu(!menu)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <ul className={Style.list} style={{display: menu ? 'block' : 'none'}}>
                    <Link to={`/home`} className={Style.Links} style={linkStyle(isHome)}>
                        <img src={HomeIcon} alt="Home" /> <span style={spanStyle(isHome)} >Home</span>
                    </Link>
                    <Link to={`/search`} className={Style.Links} style={linkStyle(isSearch)} onClick={() => setSearch('')}>
                        <img src={SearchIcon} alt="Search" /> <span style={spanStyle(isSearch)} >Search</span>
                    </Link>
                    <Link to={`/playlists`} className={Style.Links} style={linkStyle(isLibrary)}>
                        <img src={PalitoIcon} alt="Library" /> <span style={spanStyle(isLibrary)} >Your Library</span>
                    </Link>
                </ul>

                <section className={Style.playlist} style={{display: menu ? 'block' : 'none'}}>
                    <h3>PLAYLISTS</h3>
                    <ul className={Style.playlistList}>
                        {!isGuest && (
                            <Link to={`/createPlaylist`} className={Style.playlistLinks}>
                                <img src={Cruz} className={Style.cruz} alt="Create" /> <span>Create Playlist</span>
                            </Link>
                        )}
                        <Link to={`/likedSongs`} className={Style.playlistLinks}>
                            <img src={Heart} className={Style.heart} alt="Liked" /> <span >Liked Songs</span>
                        </Link>
                    </ul>
                </section>

                <hr className={Style.hr} />

                <section className={Style.userPlaylist}>
                    {data ? data.map(playlist => (
                        <Link to={`/playlist/${playlist.id}`} style={{ textDecoration: 'none' }} key={playlist ? playlist.name : ''}>
                            <div className={Style.card}>
                                <p className={Style.playlistName}>{playlist.name ? playlist.name.substring(0, 25) : ''} <span style={{ display: playlist.name !== undefined ? playlist.name.length > 25 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></p>
                                <img className={Style.collaborativeImg} style={{ display: playlist.collaborative ? 'inline-block' : 'none' }} src={Collaborite} alt="Collaborative" />
                            </div>
                        </Link>
                    )).slice(0, data.length > 10 ? 10 : data.length) : ''}
                    <Link to={`/playlists`} style={{textDecoration: 'none'}}>
                        <p className={Style.seeAll} style={{ display: data.length > 10 ? 'block' : 'none' }}>See more</p>
                    </Link>
                </section>
            </section>
        </nav>
    )
}

export default Nav
