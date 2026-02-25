import { useState, useEffect } from 'react';
import * as api from '../helpers/helper';

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

export const Artists = (search, token) => useSpotifyApi(api.GetArtists, [search, token], { 
    condition: !!(token && search),
    args: [search, token] 
});

export const Track = (search, token) => useSpotifyApi(api.GetTrack, [search, token], { 
    condition: !!(token && search),
    args: [search, token] 
});

export const User = (usr, token) => useSpotifyApi(api.GetUser, [usr, token], { 
    condition: !!(token && usr),
    defaultData: {},
    args: [usr, token]
});

export const ObtainAlbum = (id, token) => useSpotifyApi(api.GetAlbum, [id, token], { 
    condition: !!(token && id),
    args: [id, token]
});

export const FeaturedPlaylist = (token) => useSpotifyApi(api.GetPlaylist, [token], { 
    condition: !!token,
    args: [token]
});

export const UserPlaylist = (token, trigger) => useSpotifyApi(api.GetUserPlaylist, [token, trigger], { 
    condition: !!token,
    args: [token]
});

export const SpecificArtist = (id, token) => useSpotifyApi(api.GetSpecificArtist, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});

export const Album = (id, token) => useSpotifyApi(api.GetSpecificAlbum, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});

export const ArtistTopTrack = (id, token) => useSpotifyApi(api.GetArtistTopTrack, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});

export const NewReleases = (token) => useSpotifyApi(api.GetNewReleases, [token], { 
    condition: !!token,
    args: [token]
});


export const Appears_On = (id, token) => useSpotifyApi(api.GetAppears_on, [id, token], { 
    condition: !!(token && id),
    args: [id, token]
});

export const UserProfile = (token) => useSpotifyApi(api.GetUserProfile, [token], { 
    condition: !!token,
    defaultData: {},
    args: [token]
});

export const UserRecentlyPlayed = (token) => useSpotifyApi(api.GetUserRecentlyPlayed, [token], { 
    condition: !!token,
    args: [token]
});

export const SpecifiedPlaylist = (id, token, trigger) => useSpotifyApi(api.GetSpecifiedPlaylist, [id, token, trigger], { 
    condition: !!token,
    args: [id, token]
});

export const BrowseCategories = (token) => useSpotifyApi(api.GetBrowseCategories, [token], { 
    condition: !!token,
    args: [token]
});

export const CategoryPlaylist = (id, token) => useSpotifyApi(api.GetCategoryPlaylist, [id, token], { 
    condition: !!token,
    args: [id, token] 
});

export const Category = (id, token) => useSpotifyApi(api.GetCategory, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});

export const LikedSongsApi = (token, trigger) => useSpotifyApi(api.GetLikedSongs, [token, trigger], { 
    condition: !!token,
    args: [token]
});

export const DeleteLikedSongApi = (id, token) => useSpotifyApi(api.DeleteLikedSong, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});

export const SaveTracks = (id, token) => useSpotifyApi(api.PutSaveTracks, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});

export const AddPlaylist = (id, token, name, desc, state) => useSpotifyApi(api.PostPlaylist, [id, token, name, desc, state], { 
    condition: !!token,
    defaultData: {},
    args: [id, token, name, desc, state]
});

export const UpdatePlaylist = (id, token, name, desc, state) => useSpotifyApi(api.PutPlaylist, [id, token, name, desc, state], { 
    condition: !!token,
    defaultData: {},
    args: [id, token, name, desc, state]
});

export const AddToPlaylist = (id, token, uri) => useSpotifyApi(api.AddItemToPlaylist, [id, token, uri], { 
    condition: !!(token && id && uri),
    defaultData: {},
    args: [id, token, uri]
});

export const RemoveToPlaylist = (id, token, uri) => useSpotifyApi(api.RemoveItemToPlaylist, [id, token, uri], { 
    condition: !!(token && id && uri),
    defaultData: {},
    args: [id, token, uri]
});

export const DeletePlaylist = (id, token) => useSpotifyApi(api.UnfollowPlaylist, [id, token], { 
    condition: !!(token && id),
    defaultData: {},
    args: [id, token]
});
