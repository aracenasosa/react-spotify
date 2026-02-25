import React, { useState, useEffect } from 'react';
import User from '../../../assets/user.jpeg';
import Style from './Song.module.css';
import { LikedSongsApi, SaveTracks, DeleteLikedSongApi } from '../../../hooks/hook';
import cx from 'classnames';

const Songs = ({ song, setId2, setId, idliked, idliked2, token, userPlaylist, setPlaylist, refreshLiked }) => {

    let minutes = Math.floor(song.duration_ms / 60000);
    let seconds = ((song.duration_ms % 60000) / 1000).toFixed(0);
    const [play, setPlay] = useState(true);
    const { data, loading, err } = LikedSongsApi(token, refreshLiked);
    const [option, setOption] = useState(false);

    let liked = false;
    let map = [];
    let recorrer = [];
    const Refresh = () => {
        recorrer = data ? data.map(songs => map.push(songs.track.id)) : '';
        liked = map ? map.includes(song ? song.id : '') : 'na';
    };
    Refresh();


    return (
        <section className={Style.container}>
            <div className={Style.song_row}>
                <div className={Style.embed_container}>
                    <iframe 
                        src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator&theme=0`} 
                        width="100%" 
                        height="80" 
                        frameBorder="0" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        title={song ? song.name : ''}
                    ></iframe>
                </div>

                <div className={Style.controls}>
                    {liked ? <i className={cx("fas fa-heart", Style.greenHeartFull)} onClick={() => setId2(song ? song.id : '')}></i> :
                        <i className={cx("far fa-heart", Style.greenHeart)} onClick={() => setId(song ? song.id : '')}></i>
                    }

                    <div className={Style.circleContainer} onClick={() => setOption(!option)}>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                    </div>

                    <div className={Style.options} style={{ display: option ? 'block' : 'none' }}>
                        <i className={cx("fas fa-times", Style.x)} onClick={() => setOption(!option)}></i>
                        <div className={Style.playlistContainer}>{userPlaylist && userPlaylist.length > 0 ? userPlaylist.map(playlist => (
                            <p className={Style.playlistName}
                                key={playlist.id}
                                onClick={() => {
                                    setPlaylist({ id: playlist ? playlist.id : '', uri: song ? song.uri : '' });
                                    setOption(!option);
                                }}>
                                {playlist ? playlist.name : ''}
                            </p>
                        )) : ''}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Songs
