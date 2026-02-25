import axios from 'axios';
import { useState, useEffect } from 'react';
import { Credentials } from './credentials';

// Base instance to avoid repeating the base URL and headers
const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1',
});

// Interceptor to set Content-Type if not provided
spotify.interceptors.request.use(config => {
    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

/**
 * Generic request helper to centralize all Spotify API calls
 */
const spotifyRequest = async (method, url, token, data = null, params = {}) => {
    try {
        const response = await spotify({
            method,
            url,
            data,
            params,
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response; // Return the full response to keep access to .status
    } catch (err) {
        console.error(`Spotify API Error [${method} ${url}]:`, err.response?.data || err.message);
        throw err;
    }
};

export const GetToken = search => {
    const [token, setToken] = useState('');

    useEffect(() => {
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(Credentials.client_id + ':' + Credentials.client_secret)}`,
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
        .then(res => setToken(res.data.access_token))
        .catch(err => console.error('Failed to get client credentials token:', err));
    }, [search]);

    return token;
};

// --- READ OPERATIONS ---
export const GetArtists = (search, token) => spotifyRequest('GET', '/search', token, null, { q: search, type: 'artist', limit: 50 }).then(res => res.data.artists.items);
export const GetTrack = (search, token) => spotifyRequest('GET', '/search', token, null, { q: search, type: 'track', limit: 12 }).then(res => res.data.tracks.items);
export const GetAlbum = (id, token) => spotifyRequest('GET', `/artists/${id}/albums`, token, null, { limit: 50, include_groups: 'album,single,compilation,appears_on' }).then(res => res.data.items);
export const GetUser = (user, token) => spotifyRequest('GET', `/users/${user}`, token).then(res => res.data);
export const GetPlaylist = (token) => spotifyRequest('GET', '/search', token, null, { q: 'featured', type: 'playlist', limit: 50 }).then(res => res.data.playlists.items).catch(() => []);
export const GetSpecificArtist = (id, token) => spotifyRequest('GET', `/artists/${id}`, token).then(res => res.data);
export const GetSpecificAlbum = (id, token) => spotifyRequest('GET', `/albums/${id}`, token).then(res => res.data);
export const GetArtistTopTrack = (id, token) => spotifyRequest('GET', `/artists/${id}/top-tracks`, token, null, { market: 'US' }).then(res => res.data.tracks);
export const GetNewReleases = (token) => spotifyRequest('GET', '/browse/new-releases', token, null, { limit: 50 }).then(res => res.data.albums.items).catch(() => []);
export const GetAppears_on = (id, token) => spotifyRequest('GET', `/artists/${id}/albums`, token, null, { include_groups: 'appears_on' }).then(res => res.data.items);
export const GetUserProfile = (token) => spotifyRequest('GET', '/me', token).then(res => res.data);
export const GetUserPlaylist = (token) => spotifyRequest('GET', '/me/playlists', token, null, { limit: 50 }).then(res => res.data.items);
export const GetUserRecentlyPlayed = (token) => spotifyRequest('GET', '/me/player/recently-played', token, null, { limit: 50 }).then(res => res.data.items);
export const GetSpecifiedPlaylist = (id, token) => spotifyRequest('GET', `/playlists/${id}`, token).then(res => res.data);
export const GetBrowseCategories = (token) => spotifyRequest('GET', '/browse/categories', token).then(res => res.data.categories.items);
export const GetCategoryPlaylist = (id, token) => spotifyRequest('GET', `/browse/categories/${id}/playlists`, token, null, { limit: 50 }).then(res => res.data.playlists.items);
export const GetCategory = (id, token) => spotifyRequest('GET', `/browse/categories/${id}`, token).then(res => res.data);
export const GetLikedSongs = (token) => spotifyRequest('GET', '/me/tracks', token, null, { limit: 50 }).then(res => res.data.items);

// --- WRITE OPERATIONS --- (Returning full response object to allow components to check .status)
export const DeleteLikedSong = (id, token) => spotifyRequest('DELETE', '/me/tracks', token, { ids: id.split(',') });
export const PutSaveTracks = (id, token) => spotifyRequest('PUT', '/me/tracks', token, { ids: id.split(',') });
export const PostPlaylist = (id, token, name, description, state) => spotifyRequest('POST', `/users/${id}/playlists`, token, { name, description, public: state });
export const PutPlaylist = (id, token, name, description, state) => spotifyRequest('PUT', `/playlists/${id}`, token, { name, description: description?.trim().length > 0 ? description : "", "public": state === 'true' || state === true });
export const AddItemToPlaylist = (id, token, uri) => spotifyRequest('POST', `/playlists/${id}/tracks`, token, { uris: uri.split(','), position: 0 });
export const RemoveItemToPlaylist = (id, token, uri) => spotifyRequest('DELETE', `/playlists/${id}/tracks`, token, { tracks: [{ uri }] });
export const UnfollowPlaylist = (id, token) => spotifyRequest('DELETE', `/playlists/${id}/followers`, token);
