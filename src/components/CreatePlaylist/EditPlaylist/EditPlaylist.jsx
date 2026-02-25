import Style from './EditPlaylist.module.css';
import React, { useState, useEffect } from 'react';
import Nav from '../../Nav/Nav.jsx';
import { SpecifiedPlaylist, UpdatePlaylist } from '../../../hooks/hook';
import { Link } from 'react-router-dom';
import User from '../../../assets/user.jpeg';
import UserProfileHeader from '../../UserProfileHeader/UserProfileHeader';
import { withRouter } from 'react-router-dom';
import Spotify from '../../../assets/spotifyIcon.svg';
import { toast } from 'react-toastify';

import { useSpotify } from '../../../context/SpotifyContext';

const EditPlaylist = ({ history, match: { params: { id } } }) => {

    const { token, user } = useSpotify();
    const { data: dataPlaylist, loading: playlistLoading, err: playlistErr } = SpecifiedPlaylist(id, token);

    const [data, setData] = useState({
        name: '',
        description: '',
        state: false
    });

    const Submit = e => {
        e.preventDefault();
        if (e.target.name.value.trim().length < 1) {
            alert('Pls, enter the name');
        }
        else {
            setData({
                name: e.target.name.value,
                description: e.target.description.value,
                state: e.target.state.value
            })

            e.target.name.value = '';
            e.target.description.value = '';
            e.target.state.value = false

        }
    };

    /* window.setTimeout(() => {
     setData({
         name: dataPlaylist.name ? dataPlaylist.name : '',
         description: dataPlaylist ? dataPlaylist.description : '',
         state: dataPlaylist ? dataPlaylist.public : false
     });
    }) */

    const { data: result, loading: userresult, err: errResult } = UpdatePlaylist(
        id,
        token,
        data.name,
        data.description,
        data.state
    );

    useEffect(() => {
        if (result && result.status === 200) {
            toast.success('Playlist updated', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
            history.push(`/home`);
        }
    }, [result, history]);

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.createForm}>

                <UserProfileHeader />
                
                <section>
                    <h2 className={Style.h2}>Edit a Playlist</h2>
                    <form className={Style.form} onSubmit={Submit}>
                        <img className={Style.App_logo} src={Spotify} alt="Spotify Logo" />

                        <input type="text" placeholder="Playlist Name" name="name" autoComplete="off" />

                        <textarea
                            placeholder="Playlist Description(Optional)"
                            name="description"
                            autoComplete="off">
                        </textarea>

                        <select name="state">
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </select>
                        <button type="submit">Save</button>
                    </form>
                </section>
            </section>

        </main >
    )
}

export default EditPlaylist
