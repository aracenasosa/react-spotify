import React from 'react';
import Style from './RecentlyPlayed.module.css';
import {Link} from 'react-router-dom';
import User from '../../../assets/user.jpeg';
import {SpecificArtist} from '../../../hooks/hook';   

const RecentlyPlayed = ({recentlyPlayed, token}) => {

    const track = recentlyPlayed?.track;
    const { data, loading, err } = SpecificArtist( track?.artists ? track.artists[0].id : '', token);

    return (
        <section className={Style.marginContainer}>
            <a href={`/album/${track?.album ? track.album.id : ''}`} style={{ textDecoration: 'none' }}>
                <section className={Style.card}>
                    <img className={Style.artistImg} src={data && data.images && data.images.length > 0 ? data.images[0].url : User} alt={data ? data.name : ''} />

                    <h4>{track?.artists && track.artists[0] ? track.artists[0].name.substring(0, 14) : ''} <span style={{ display: track?.artists && track.artists[0] && track.artists[0].name.length > 14 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                    <p>{track ? track.name.substring(0, 20) : ''} <span style={{ display: track && track.name.length > 20 ? 'inline' : 'none', color: '#fff' }}>...</span></p>

                </section>
            </a>
        </section >
    )
}

export default RecentlyPlayed
