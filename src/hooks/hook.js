import { useState, useEffect } from 'react';
import * as api from '../helpers/helper';
import * as dataProvider from '../helpers/dataProvider';
import { isGuestMode } from '../helpers/sessionManager';

/**
 * Generic hook for all Spotify data fetching.
 * Handles state, loading, errors and conditional fetching.
 */
const useSpotifyApi = (apiFn, deps = [], options = {}) => {
    const { 
        condition = true, 
        initialLoading = false, 
        defaultData = [],
        args = []
    } = options;

    const [state, setState] = useState({
        data: defaultData,
        loading: condition ? true : initialLoading,
        err: ''
    });

    useEffect(() => {
        if (!condition) return;
        
        let isMounted = true;
        setState(prev => ({ ...prev, loading: true }));

        apiFn(...args)
            .then(data => {
                if (isMounted) setState({ data, loading: false, err: '' });
            })
            .catch(err => {
                if (isMounted) setState({ data: defaultData, loading: false, err: err.message || 'Error' });
            });

        return () => { isMounted = false; };
    }, deps);

    return state;
};

// --- REFACTORED EXPORTED HOOKS ---

export const Artists = (search, token) => useSpotifyApi(dataProvider.searchArtists, [search, token], { 
    condition: !!(token && search) || (isGuestMode() && search),
    args: [search, token] 
});

export const Track = (search, token) => useSpotifyApi(dataProvider.searchTracks, [search, token], { 
    condition: !!(token && search) || (isGuestMode() && search),
    args: [search, token] 
});

export const User = (usr, token) => useSpotifyApi(api.GetUser, [usr, token], { 
    condition: !!(token && usr),
    defaultData: {},
    args: [usr, token]
});

export const ObtainAlbum = (id, token) => useSpotifyApi(dataProvider.getArtistAlbums, [id, token], { 
    condition: !!(token && id) || (isGuestMode() && id),
    args: [id, token]
});

export const FeaturedPlaylist = (token) => useSpotifyApi(dataProvider.getFeaturedPlaylists, [token], { 
    condition: !!token || isGuestMode(),
    args: [token]
});

export const UserPlaylist = (token, trigger) => useSpotifyApi(dataProvider.getUserPlaylists, [token, trigger], { 
    condition: !!token || isGuestMode(),
    args: [token]
});

export const SpecificArtist = (id, token) => useSpotifyApi(dataProvider.getSpecificArtist, [id, token], { 
    condition: !!(token && id) || (isGuestMode() && id),
    defaultData: {},
    args: [id, token]
});

export const Album = (id, token) => useSpotifyApi(dataProvider.getSpecificAlbum, [id, token], { 
    condition: !!(token && id) || (isGuestMode() && id),
    defaultData: {},
    args: [id, token]
});

export const ArtistTopTrack = (id, token) => useSpotifyApi(dataProvider.getArtistTopTracks, [id, token], { 
    condition: !!(token && id) || (isGuestMode() && id),
    defaultData: {},
    args: [id, token]
});

export const NewReleases = (token) => useSpotifyApi(dataProvider.getNewReleases, [token], { 
    condition: !!token || isGuestMode(),
    args: [token]
});


export const Appears_On = (id, token) => useSpotifyApi(dataProvider.getArtistAppearsOn, [id, token], { 
    condition: !!(token && id) || (isGuestMode() && id),
    args: [id, token]
});

export const UserProfile = (token) => useSpotifyApi(dataProvider.getUserProfile, [token], { 
    condition: !!token || isGuestMode(),
    defaultData: {},
    args: [token]
});

export const UserRecentlyPlayed = (token) => useSpotifyApi(dataProvider.getRecentlyPlayed, [token], { 
    condition: !!token || isGuestMode(),
    args: [token]
});

export const SpecifiedPlaylist = (id, token, trigger) => useSpotifyApi(dataProvider.getSpecificPlaylist, [id, token, trigger], { 
    condition: !!token || isGuestMode(),
    args: [id, token]
});

export const BrowseCategories = (token) => useSpotifyApi(dataProvider.getBrowseCategories, [token], { 
    condition: !!token || isGuestMode(),
    args: [token]
});

export const CategoryPlaylist = (id, token) => useSpotifyApi(dataProvider.getCategoryPlaylists, [id, token], { 
    condition: !!token || isGuestMode(),
    args: [id, token] 
});

export const Category = (id, token) => useSpotifyApi(dataProvider.getCategory, [id, token], { 
    condition: !!(token && id) || (isGuestMode() && id),
    defaultData: {},
    args: [id, token]
});

export const LikedSongsApi = (token, trigger) => useSpotifyApi(dataProvider.getLikedSongs, [token, trigger], { 
    condition: !!token || isGuestMode(),
    args: [token]
});

export const DeleteLikedSongApi = (id, token) => useSpotifyApi(dataProvider.deleteLikedSong, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});

export const SaveTracks = (id, token) => useSpotifyApi(dataProvider.saveTracks, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});

export const AddPlaylist = (id, token, name, desc, state) => useSpotifyApi(dataProvider.createPlaylist, [id, token, name, desc, state], { 
    condition: !!token,
    defaultData: {},
    args: [id, name, desc, state, token]
});

export const UpdatePlaylist = (id, token, name, desc, state) => useSpotifyApi(dataProvider.updatePlaylist, [id, token, name, desc, state], { 
    condition: !!token,
    defaultData: {},
    args: [id, name, desc, state, token]
});

export const AddToPlaylist = (id, token, uri) => useSpotifyApi(dataProvider.addItemToPlaylist, [id, token, uri], { 
    condition: !!(token && id && uri),
    defaultData: {},
    args: [id, uri, token]
});

export const RemoveToPlaylist = (id, token, uri) => useSpotifyApi(dataProvider.removeItemFromPlaylist, [id, token, uri], { 
    condition: !!(token && id && uri),
    defaultData: {},
    args: [id, uri, token]
});

export const DeletePlaylist = (id, token) => useSpotifyApi(dataProvider.unfollowPlaylist, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});
