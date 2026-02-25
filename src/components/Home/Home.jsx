import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import Style from './Home.module.css';
import NewRelease from './NewReleases/NewRelease';
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed';
import { NewReleases, FeaturedPlaylist, UserProfile, UserRecentlyPlayed } from '../../hooks/hook';
import FeaturedPlaylistcp from '../Search/FeaturedPlaylist/FeaturedPlaylistcp';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import cx from 'classnames';

import { useSpotify } from '../../context/SpotifyContext';

const Home = () => {

    const { token, user, userLoading, isGuest } = useSpotify();
    const { data: releases, loading: loadingReleases, err: errReleases } = NewReleases(token);
    const { data: featuredPlaylist, loading: loadingPlaylist, err: errPlaylist } = FeaturedPlaylist(token);
    const { data: recentlyPlayed, loading: loadingRecentlyPlayed, err: errrecentlyPlayed } = UserRecentlyPlayed(token);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirect if no token and not in guest mode
    if (!token && !localStorage.getItem('token') && !isGuest) {
        return <Redirect to="/" />;
    }

    const isAppLoading = userLoading || loadingReleases || loadingPlaylist || loadingRecentlyPlayed;

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.home}>

                <section className={Style.topHeader}>
                    <UserProfileHeader user={user} />
                </section>

                {!isAppLoading ?
                    <section>

                        {isGuest && (
                            <div style={{
                                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                                border: '1px solid rgba(255, 193, 7, 0.3)',
                                borderRadius: '8px',
                                padding: '16px 20px',
                                margin: '15px 20px 24px 20px',
                                color: '#ffc107'
                            }}>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                                    <strong>Guest Mode:</strong> You're viewing mock data with limited functionality. Log in with Spotify for the full experience including personalized recommendations, playlist creation, and playback controls.
                                </p>
                            </div>
                        )}

                        <section className={Style.section_recently} style={{ display: recentlyPlayed && recentlyPlayed.length > 0 ? 'block' : 'none' }}>

                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>Recently Played</h2>
                                <Link to="/allRecentlyPlayed" style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: recentlyPlayed && recentlyPlayed.length > 8 ? 'block' : 'none', marginBottom: '10px' }}>See more</p>
                                </Link>
                            </div>

                            <div className={Style.recentlyContainer}>
                                {recentlyPlayed && recentlyPlayed.length > 0 ? recentlyPlayed.filter(r => r && r.track).map((recently, idx) => (
                                    <RecentlyPlayed 
                                        key={idx}
                                        recentlyPlayed={recently} 
                                        token={token}
                                    />
                                )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>

                        <section className={Style.section_a} style={{ display: releases && releases.length > 0 ? 'block' : 'none' }}>
                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>New Releases</h2>
                                <Link to="/allNewRelease" style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: releases && releases.length > 8 ? 'block' : 'none', marginBottom: '10px' }}>See more</p>
                                </Link>
                            </div>
                            <div className={Style.releasesContainer}>
                                {releases && releases.length > 0 ? releases.filter(r => r).map((release, idx) => (
                                    <NewRelease 
                                        key={idx}
                                        release={release} 
                                    />
                                )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>

                        <section className={Style.section_b} style={{ display: featuredPlaylist && featuredPlaylist.length > 0 ? 'block' : 'none' }}>
                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>Featured Playlist</h2>
                                <Link to="/allFeaturedPlaylist" style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: featuredPlaylist && featuredPlaylist.length > 8 ? 'block' : 'none', marginBottom: '10px' }}>See more</p>
                                </Link>
                            </div>
                            <div className={Style.featuredContainer}>
                                {featuredPlaylist && featuredPlaylist.length > 0 ? featuredPlaylist.filter(p => p).map((play, idx) => (
                                    <FeaturedPlaylistcp 
                                        key={idx}
                                        playlist={play} 
                                    />
                                )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>
                    </section>
                    : (
                      <div className={Style.loadingContainer}>
                        <i className={cx('fas fa-sync fa-8x', Style.loading)}></i>
                      </div>
                    )}
            </section>

        </main>
    )
}

export default Home
