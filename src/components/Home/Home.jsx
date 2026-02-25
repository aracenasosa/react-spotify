import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
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

    const { token, user, userLoading } = useSpotify();
    const { data: releases, loading: loadingReleases, err: errReleases } = NewReleases(token);
    const { data: featuredPlaylist, loading: loadingPlaylist, err: errPlaylist } = FeaturedPlaylist(token);
    const { data: recentlyPlayed, loading: loadingRecentlyPlayed, err: errrecentlyPlayed } = UserRecentlyPlayed(token);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirect if no token
    if (!token && !localStorage.getItem('token')) {
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

                        <section className={Style.section_recently} style={{ display: releases && releases.length > 0 ? 'block' : 'none' }}>

                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>Recently Played</h2>
                                <a href="/allRecentlyPlayed" style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: recentlyPlayed && recentlyPlayed.length > 8 ? 'block' : 'none', marginBottom: '10px' }}>See more</p>
                                </a>
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
                                <a href="/allNewRelease" style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: releases && releases.length > 8 ? 'block' : 'none', marginBottom: '10px' }}>See more</p>
                                </a>
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
                                <a href="/allFeaturedPlaylist" style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: featuredPlaylist && featuredPlaylist.length > 8 ? 'block' : 'none', marginBottom: '10px' }}>See more</p>
                                </a>
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
                        <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>
                      </div>
                    )}
            </section>

        </main>
    )
}

export default Home
