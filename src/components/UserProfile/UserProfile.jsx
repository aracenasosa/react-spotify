import React, { useState } from 'react';
import Style from './UserProfile.module.css';
import Nav from '../Nav/Nav.jsx';
import User from '../../assets/user.jpeg';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import { Link } from 'react-router-dom';
import NavigationArrows from '../NavigationArrows/NavigationArrows';

import { useSpotify } from '../../context/SpotifyContext';

const UserProfileCo = () => {

    const { token, user } = useSpotify();

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>

            <section className={Style.userContainer}>

                <section className={Style.topHeader}>
                    <div className={Style.arrows}>
                        <NavigationArrows />
                        <UserProfileHeader user={user} />
                    </div>
                </section>

                <section className={Style.description}>
                    <h1>Account Description</h1>
                    <h4 className={Style.h4}>Profile</h4>
                    <img src={user && user.images && user.images.length > 0 ? user.images[0].url : User} />
                    <div className={Style.border}>
                        <p className={Style.title}>Username</p>
                        <p className={Style.info}>{user ? user.id : ''}</p>
                    </div>
                    <div className={Style.border}>
                        <p className={Style.title}>Email</p>
                        <p className={Style.info}>{user ? user.email : ''}</p>
                    </div>
                    <div className={Style.border}>
                        <p className={Style.title}>Country or Region</p>
                        <p className={Style.info}>{user ? user.country : ''}</p>
                    </div>
                    <div className={Style.plan}>
                        <h4>Your Plan</h4>
                        <div className={Style.top} style={{ background: user ? user.product === 'open' ? 'rgb(174,41,189)' : user.product === 'premium' ? 'rgb(45,70,185)' : 'rgb(52, 73, 94)' : '' }}>
                            <p>{user ? user.product === 'open' ? 'Free Spotify' : user.product === 'premium' ? 'Spotify Premium Duo' : '' : 'Not Info'}</p>
                        </div>

                        <div className={Style.bottom}>
                            <p>{user ? user.product === 'open' ? 'Play music only in shuffle mode, with ads.' : user.product === 'premium' ? 'Two separate Premium accounts for people living together.' : '' : 'Not Info'}</p>
                            <strong className={Style.type}>{user ? user.product === 'open' ? 'Free' : user.product === 'premium' ? 'You are a member of a Duo plan.' : '' : 'Not Info'}</strong>
                        </div>

                    </div>
                </section>
            </section>

        </main >
    )
}

export default UserProfileCo
