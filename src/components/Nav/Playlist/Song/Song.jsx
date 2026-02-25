import React, { useState, useEffect, useRef } from 'react';
import Style from './Song.module.css';
import cx from 'classnames';

const Song = ({ song, idx, collaborative, token, userPlaylist, setPlaylist, playlist, setId, setId2, idliked, idliked2, setUriRemove, refreshLiked }) => {

    const [play, setPlay] = useState(false);
    const [option, setOption] = useState(false);
    const optionsRef = useRef(null);

    const liked = idliked === (song.track ? song.track.id : '') || idliked2 === (song.track ? song.track.id : '');

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
        <tr className={Style.container}>
            <td className={Style.number} onClick={() => setPlay(!play)}>{idx + 1}</td>
            <td className={Style.flex} onClick={() => setPlay(!play)}>
                <iframe
                    src={`https://open.spotify.com/embed/track/${song.track ? song.track.id : ''}?utm_source=generator&theme=0`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={song.track ? song.track.name : ''}
                ></iframe>
            </td>
            <td className={cx(Style.albumName, Style.erased2)}>{song.track ? song.track.album.name : ''}</td>
            <td className={Style.addedBy} style={{ display: collaborative ? '' : 'none' }}>{song.added_by ? song.added_by.id : ''}</td>
            <td className={cx(Style.date, Style.erased)}>{song.added_at ? new Date(song.added_at).toDateString() : ''}</td>
            <td className={Style.duration}>
                <div style={{ position: 'relative' }}>
                    {liked ? <i className={cx("fas fa-heart", Style.greenHeartFull)} onClick={() => setId2(song.track ? song.track.id : '')}></i> :
                        <i className={cx("far fa-heart", Style.greenHeart)} onClick={() => setId(song.track ? song.track.id : '')}></i>
                    }

                    {song.track ? `${Math.floor(song.track.duration_ms / 60000)}:${(((song.track.duration_ms % 60000) / 1000).toFixed(0) < 10 ? '0' : '')}${((song.track.duration_ms % 60000) / 1000).toFixed(0)}` : ''}

                    <div className={Style.circleContainer} onClick={() => setOption(!option)}>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                    </div>

                    <div ref={optionsRef} className={Style.options} style={{ display: option ? 'block' : 'none' }}>
                        <div className={Style.xContainer}>
                            <i className={cx("fas fa-times", Style.x)} onClick={() => setOption(false)}></i>
                        </div>
                        {userPlaylist && userPlaylist.length > 0 ? userPlaylist.map((pl, pIdx) => (
                            <p className={Style.playlistName} key={pIdx}
                                onClick={() => {
                                    setPlaylist({ id: pl ? pl.id : '', uri: song.track ? song.track.uri : '' });
                                    setOption(false);
                                }}>
                                {pl ? pl.name : ''}
                            </p>
                        )) : <p className={Style.playlistName}>No Playlists Found</p>}
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Song;
