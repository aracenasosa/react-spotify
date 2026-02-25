import React, { useState } from 'react';
import Style from './BrowseCategories.module.css';
import { CategoryPlaylist, Category } from '../../../hooks/hook';
import User from '../../../assets/user.jpeg';
import UserProfileHeader from '../../UserProfileHeader/UserProfileHeader';
import Nav from '../../Nav/Nav.jsx';
import { Link } from 'react-router-dom';
import NavigationArrows from '../../NavigationArrows/NavigationArrows';
import cx from 'classnames';

import { useSpotify } from '../../../context/SpotifyContext';

const BrowseCategories = ({ match: { params: { id } } }) => {

    const { token, user } = useSpotify();
    const { data, loading } = CategoryPlaylist(id, token);
    const { data: category, loading: loadingCategory, err: errCategory } = Category(id, token);

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>

            <section className={Style.category}>

                {loading || loadingCategory ?
                    <section>

                        <div className={Style.arrows}>
                                <NavigationArrows />

                            <UserProfileHeader user={user} />
                        </div>
                        <p style={{ color: '#fff', fontSize: '30px', textAlign: 'center', marginTop: '40px' }}>Loading ...</p>
                    </section>
                    :
                    <section>
                        <div className={Style.header} >
                            <div className={Style.arrows}>
                                    <NavigationArrows />

                                <UserProfileHeader />
                            </div>

                            <div className={Style.content}>
                                <h1>{category.name || id}</h1>
                            </div>
                        </div>

                        <section className={Style.section_a}>
                            {data.map(playlist =>
                                <section className={Style.marginContainer}>
                                    <Link to={`/playlist/${playlist.id}`} style={{ textDecoration: 'none' }}>
                                        <section className={Style.card}>
                                            <img className={Style.artistImg} src={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : User} alt={playlist ? playlist.name : ''} />

                                            <h4>{playlist ? playlist.name.substring(0, 20) : ''} <span style={{ display: playlist ? playlist.name.length > 20 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                                            <p>By {playlist.owner ? playlist.owner.display_name : ''}</p>

                                        </section>
                                    </Link>
                                </section >
                            )}
                        </section>
                    </section>
                }
            </section>
        </main>
    )
}

export default BrowseCategories;
