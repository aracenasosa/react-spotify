import React, { useState } from 'react';
import CountUp from 'react-countup';
import Style from './Song.module.css';
import cx from 'classnames';
import { SaveTracks, LikedSongsApi, DeleteLikedSongApi } from '../../../hooks/hook';

const Song = ({ song, idx, token, userPlaylist, setPlaylist, setId2, setId, refreshLiked }) => {

    const [option, setOption] = useState(false);
    const { data, loading, err } = LikedSongsApi(token, refreshLiked);

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
            <iframe 
                src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator&theme=0`} 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title={song.name}
            ></iframe>

            <div className={Style.controls}>

                {liked ? <i className={cx("fas fa-heart", Style.greenHeartFull)} onClick={() => setId2(song.id)}></i> :
                    <i className={cx("far fa-heart", Style.greenHeart)} onClick={() => setId(song.id)}></i>
                }

                <span className={Style.time}>{song ? `${Math.floor(song.duration_ms / 60000)}:${(((song.duration_ms % 60000) / 1000).toFixed(0) < 10 ? '0' : '')}${((song.duration_ms % 60000) / 1000).toFixed(0)}` : ''}</span>

                <div className={Style.circleContainer} onClick={() => setOption(!option)}>
                    <div className={Style.circle}></div>
                    <div className={Style.circle}></div>
                    <div className={Style.circle}></div>
                </div>

                <div className={Style.options} style={{ display: option ? 'block' : 'none' }}>
                    <i className={cx("fas fa-times", Style.x)} onClick={() => setOption(!option)}></i>
                    <div className={Style.playlistContainer}>
                        {userPlaylist && userPlaylist.length > 0 ? userPlaylist.map(playlist => (
                            <p className={Style.playlistName}
                                key={playlist.id}
                                onClick={() => {
                                    setPlaylist({ id: playlist ? playlist.id : '', uri: song ? song.uri : '' });
                                    setOption(!option);
                                }}>
                                {playlist ? playlist.name : ''}
                            </p>
                        )) : <p className={Style.playlistName}>No Playlists Found</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Song
