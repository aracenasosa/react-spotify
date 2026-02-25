import React, { useState, useEffect } from 'react';
import Style from './Playlist.module.css';
import { Link } from 'react-router-dom';
import User from '../../../assets/user.jpeg';
import { DeletePlaylist } from '../../../hooks/hook';
import { toast } from 'react-toastify';

const Playlist = ({ playlist, token, setTrigger }) => {
    const [deleteId, setDeleteId] = useState('');
    const { data: deleteData, loading: deleteLoading } = DeletePlaylist(deleteId, token);

    useEffect(() => {
        if (deleteId && deleteData && deleteData.status === 200) {
            toast.info('Playlist deleted', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
            setTrigger(prev => !prev);
        }
    }, [deleteData, deleteId, setTrigger]);

    //console.log(playlist);

    return (
        <section className={Style.marginContainer}>
            <section className={Style.card}>
                <img className={Style.artistImg} src={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : User} alt={playlist ? playlist.name : ''} />

                <h4>{playlist ? playlist.name.substring(0, 19) : ''} <span style={{ display: playlist ? playlist.name.length > 19 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                <div className={Style.btnFlex}>
                    <Link className={Style.btnEdit} to={`/editPlaylist/${playlist.id}`}>Edit</Link>
                    <button 
                        className={Style.btnDelete} 
                        onClick={() => {
                            if (window.confirm('Delete this playlist?')) {
                                setDeleteId(playlist.id);
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>

            </section>
        </section >
    )
}

export default Playlist
