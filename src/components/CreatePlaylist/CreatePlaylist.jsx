import React, { useState } from 'react';
import Nav from '../Nav/Nav.jsx';
import { UserPlaylist } from '../../hooks/hook';
import { Link } from 'react-router-dom';
import Style from './CreatePlaylist.module.css';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import Playlist from './Playlist/Playlist';

import { useSpotify } from '../../context/SpotifyContext';

const CreatePlaylist = () => {

    const { token } = useSpotify();
    const [trigger, setTrigger] = useState(false);
    const { data, loading } = UserPlaylist(token, trigger);

    return (
        <main className={Style.container}>
            <section>
                <Nav />
            </section>
            <section className={Style.createPlaylist} style={{ height: data ? data.length > 21 ? '100%' : '' : '100vh' }}>

                <UserProfileHeader />

                <section className={Style.playlists}>
                    <section className={Style.section_a} style={{ display: data && data.length > 0 ? 'block' : 'none' }}>
                        <h2 className={Style.h2}>Playlists</h2>
                        <a className={Style.btnCreate} href={`/createPlaylistForm`}>Create New</a>
                        <div className={Style.flex}>
                            {data && data.length > 0 ? data.map(playlist => <Playlist playlist={playlist} token={token} key={playlist.id} setTrigger={setTrigger} />) : ''}
                        </div>
                    </section>
                </section>

            </section>

        </main >
    )
}

export default CreatePlaylist
