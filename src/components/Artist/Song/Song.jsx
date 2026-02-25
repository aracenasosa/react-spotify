import React, { useEffect, useState, useRef } from 'react';
import Style from './Song.module.css';
import greenHeart from '../../../assets/greenHeart.svg';
import cx from 'classnames';
import {LikedSongsApi, DeleteLikedSongApi, SaveTracks} from '../../../hooks/hook';

const Song = ({ track, idx, userPlaylist, token, idliked, idliked2, setPlaylist, setId, setId2, refreshLiked }) => {

    const [option, setOption] = useState(false);
    const optionsRef = useRef(null);
    const { data, loading, err } = LikedSongsApi(token, refreshLiked);
    let liked = false;
    let map = [];
    let recorrer = [];

    const Refresh = () => {
        recorrer = data ? data.map(songs => map.push(songs.track.id)) : '';
        liked = map ? map.includes(track ? track.id : '') : 'na';
    };
    Refresh();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setOption(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className={Style.main} >
            <iframe 
                src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`} 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title={track.name}
            ></iframe>

            <div className={Style.controls}>
                
                { liked ? <i className={cx("fas fa-heart", Style.greenHeartFull)} onClick={() => setId2(track.id)}></i> : 
                 <i className={cx("far fa-heart", Style.greenHeart)} onClick={() => setId(track.id)}></i>
                }
                
                <p className={Style.duration}>{track ? `${Math.floor(track.duration_ms / 60000)}:${(((track.duration_ms % 60000) / 1000).toFixed(0) < 10 ? '0' : '')}${((track.duration_ms % 60000) / 1000).toFixed(0)}` : ''}</p>
                
                <div className={Style.circleContainer} onClick={() => setOption(!option)}>
                    <div className={Style.circle}></div>
                    <div className={Style.circle}></div>
                    <div className={Style.circle}></div>
                </div>

                <div ref={optionsRef} className={Style.options} style={{ display: option ? 'block' : 'none' }}>
                    <div className={Style.xContainer}>
                        <i className={cx("fas fa-times", Style.x)} onClick={() => setOption(false)}></i>
                    </div>
                    {userPlaylist && userPlaylist.length > 0 ? userPlaylist.map((playlist, pIdx) => (
                        <p className={Style.playlistName} key={pIdx}
                            onClick={() => {
                                setPlaylist({ id: playlist ? playlist.id : '', uri: track ? track.uri : '' });
                                setOption(false);
                            }}>
                            {playlist ? playlist.name : ''}
                        </p>
                    )) : <p className={Style.playlistName}>No Playlists Found</p>}
                </div>
            </div>
        </section>
    )
}

export default Song;
