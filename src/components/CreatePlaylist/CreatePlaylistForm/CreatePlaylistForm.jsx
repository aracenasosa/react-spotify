import React, { useState, useEffect } from 'react';
import Style from './CreatePlaylistForm.module.css';
import Nav from '../../Nav/Nav.jsx';
import { AddPlaylist } from '../../../hooks/hook';
import { Link } from 'react-router-dom';
import User from '../../../assets/user.jpeg';
import UserProfileHeader from '../../UserProfileHeader/UserProfileHeader';
import Spotify from '../../../assets/spotifyIcon.svg';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSpotify } from '../../../context/SpotifyContext';

const CreatePlaylistForm = ({ history }) => {

    const { token, user } = useSpotify();

    const [data, setData] = useState({
        name: '',
        description: '',
        state: false
    })

    const { data: result, loading: userresult, err: errResult } = AddPlaylist(
        user ? user.id : '', 
        token, 
        data.name ? data.name : '', 
        data.description ? data.description : '', 
        data.state
        );


    const Submit = e => {
        e.preventDefault();
        if(e.target.name.value.trim().length < 1) 
        {
            alert('Pls, fill all the fields');
        }
        else 
        { 
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

    useEffect(() => {
        if (result && result.status === 201) {
            toast.success('Playlist created!', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
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
                    <h2 className={Style.h2}>Create a Playlist</h2>
                    <form className={Style.form} onSubmit={Submit}>
                        <img className={Style.App_logo} src={Spotify} alt="Spotify Logo" />
                        <input type="text" placeholder="Playlist Name" name="name" autoComplete="off"/>
                        <textarea placeholder="Playlist Description(Optional)" name="description" autoComplete="off"></textarea>
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

export default CreatePlaylistForm
