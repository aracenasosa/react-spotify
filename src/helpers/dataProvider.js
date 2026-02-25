/**
 * Data Provider Layer
 * Provides unified interface for data access
 * Routes requests to mock data or real API based on current mode
 */

import { isGuestMode } from './sessionManager';
import { mockData, mockTracks, mockAlbums, mockArtists, mockPlaylists } from './mockData';
import * as helper from './helper';

// --- READ OPERATIONS ---

/**
 * Get user's recently played tracks
 */
export const getRecentlyPlayed = async (token) => {
  if (isGuestMode()) {
    return Promise.resolve(mockData.recentlyPlayed);
  }
  return helper.GetUserRecentlyPlayed(token);
};

/**
 * Get new releases
 */
export const getNewReleases = async (token) => {
  if (isGuestMode()) {
    return Promise.resolve(mockData.newReleases);
  }
  return helper.GetNewReleases(token);
};

/**
 * Get featured playlists
 */
export const getFeaturedPlaylists = async (token) => {
  if (isGuestMode()) {
    return Promise.resolve(mockData.featuredPlaylists);
  }
  return helper.GetPlaylist(token);
};

/**
 * Get user's playlists
 */
export const getUserPlaylists = async (token) => {
  if (isGuestMode()) {
    return Promise.resolve(mockData.userPlaylists);
  }
  return helper.GetUserPlaylist(token);
};

/**
 * Get specific playlist by ID
 */
export const getSpecificPlaylist = async (id, token) => {
  if (isGuestMode()) {
    const playlist = mockPlaylists.find(p => p.id === id);
    return Promise.resolve(playlist || mockPlaylists[0]);
  }
  return helper.GetSpecifiedPlaylist(id, token);
};

/**
 * Get specific album by ID
 */
export const getSpecificAlbum = async (id, token) => {
  if (isGuestMode()) {
    const album = mockAlbums.find(a => a.id === id);
    return Promise.resolve(album || mockAlbums[0]);
  }
  return helper.GetSpecificAlbum(id, token);
};

/**
 * Get specific artist by ID
 */
export const getSpecificArtist = async (id, token) => {
  if (isGuestMode()) {
    const artist = mockArtists.find(a => a.id === id);
    return Promise.resolve(artist || mockArtists[0]);
  }
  return helper.GetSpecificArtist(id, token);
};

/**
 * Get artist's top tracks
 */
export const getArtistTopTracks = async (id, token) => {
  if (isGuestMode()) {
    // Return tracks from the same artist
    const tracks = mockTracks.filter(t => t.artists[0].id === id);
    return Promise.resolve(tracks.length > 0 ? tracks : mockTracks.slice(0, 5));
  }
  return helper.GetArtistTopTrack(id, token);
};

/**
 * Get artist's albums
 */
export const getArtistAlbums = async (id, token) => {
  if (isGuestMode()) {
    // Return albums from the same artist
    const albums = mockAlbums.filter(a => a.artists[0].id === id);
    return Promise.resolve(albums.length > 0 ? albums : mockAlbums.slice(0, 2));
  }
  return helper.GetAlbum(id, token);
};

/**
 * Get artist's appears on albums
 */
export const getArtistAppearsOn = async (id, token) => {
  if (isGuestMode()) {
    // Return some albums as "appears on"
    return Promise.resolve(mockAlbums.slice(0, 2));
  }
  return helper.GetAppears_on(id, token);
};

/**
 * Get user's liked songs
 */
export const getLikedSongs = async (token) => {
  if (isGuestMode()) {
    // Return liked songs in the format expected by the API
    return Promise.resolve(mockData.likedSongs.map(track => ({ track })));
  }
  return helper.GetLikedSongs(token);
};

/**
 * Search for tracks
 */
export const searchTracks = async (query, token) => {
  if (isGuestMode()) {
    // Simple filter on mock data
    const filtered = mockTracks.filter(t => 
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.artists[0].name.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered.length > 0 ? filtered : mockTracks);
  }
  return helper.GetTrack(query, token);
};

/**
 * Search for artists
 */
export const searchArtists = async (query, token) => {
  if (isGuestMode()) {
    // Simple filter on mock data
    const filtered = mockArtists.filter(a => 
      a.name.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered.length > 0 ? filtered : mockArtists);
  }
  return helper.GetArtists(query, token);
};

/**
 * Search for albums
 */
export const searchAlbums = async (query, token) => {
  if (isGuestMode()) {
    // Simple filter on mock data
    const filtered = mockAlbums.filter(a => 
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.artists[0].name.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered.length > 0 ? filtered : mockAlbums);
  }
  // Note: helper.js doesn't have a direct album search, using track search as fallback
  return helper.GetTrack(query, token);
};

/**
 * Search for playlists
 */
export const searchPlaylists = async (query, token) => {
  if (isGuestMode()) {
    // Simple filter on mock data
    const filtered = mockPlaylists.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered.length > 0 ? filtered : mockPlaylists);
  }
  return helper.GetPlaylist(token);
};

/**
 * Get user profile
 */
export const getUserProfile = async (token) => {
  if (isGuestMode()) {
    // Return a mock guest user profile
    return Promise.resolve({
      id: 'guest-user',
      display_name: 'Guest User',
      email: null,
      images: [],
      followers: { total: 0 },
      product: 'free'
    });
  }
  return helper.GetUserProfile(token);
};

/**
 * Get browse categories
 */
export const getBrowseCategories = async (token) => {
  if (isGuestMode()) {
    // Return mock categories
    return Promise.resolve([
      { id: 'pop', name: 'Pop', icons: [{ url: 'https://i.scdn.co/image/ab67fb8200005cafa1a1a1a1a1a1a1a1a1a1a1a1' }] },
      { id: 'rock', name: 'Rock', icons: [{ url: 'https://i.scdn.co/image/ab67fb8200005cafb2b2b2b2b2b2b2b2b2b2b2b2' }] },
      { id: 'electronic', name: 'Electronic', icons: [{ url: 'https://i.scdn.co/image/ab67fb8200005cafc3c3c3c3c3c3c3c3c3c3c3c3' }] }
    ]);
  }
  return helper.GetBrowseCategories(token);
};

/**
 * Get category playlists
 */
export const getCategoryPlaylists = async (id, token) => {
  if (isGuestMode()) {
    return Promise.resolve(mockPlaylists);
  }
  return helper.GetCategoryPlaylist(id, token);
};

/**
 * Get category details
 */
export const getCategory = async (id, token) => {
  if (isGuestMode()) {
    return Promise.resolve({
      id: id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      icons: [{ url: 'https://i.scdn.co/image/ab67fb8200005cafa1a1a1a1a1a1a1a1a1a1a1a1' }]
    });
  }
  return helper.GetCategory(id, token);
};

// --- WRITE OPERATIONS ---
// These operations only work in authenticated mode
// In guest mode, they return rejected promises with appropriate messages

/**
 * Save tracks to user's library
 */
export const saveTracks = async (ids, token) => {
  if (isGuestMode()) {
    return Promise.reject(new Error('This feature requires login. Please log in to save tracks.'));
  }
  return helper.PutSaveTracks(ids, token);
};

/**
 * Delete liked song from user's library
 */
export const deleteLikedSong = async (id, token) => {
  if (isGuestMode()) {
    return Promise.reject(new Error('This feature requires login. Please log in to manage your library.'));
  }
  return helper.DeleteLikedSong(id, token);
};

/**
 * Create a new playlist
 */
export const createPlaylist = async (userId, name, description, isPublic, token) => {
  if (isGuestMode()) {
    return Promise.reject(new Error('This feature requires login. Please log in to create playlists.'));
  }
  return helper.PostPlaylist(userId, token, name, description, isPublic);
};

/**
 * Update playlist details
 */
export const updatePlaylist = async (id, name, description, isPublic, token) => {
  if (isGuestMode()) {
    return Promise.reject(new Error('This feature requires login. Please log in to edit playlists.'));
  }
  return helper.PutPlaylist(id, token, name, description, isPublic);
};

/**
 * Add item to playlist
 */
export const addItemToPlaylist = async (id, uris, token) => {
  if (isGuestMode()) {
    return Promise.reject(new Error('This feature requires login. Please log in to modify playlists.'));
  }
  return helper.AddItemToPlaylist(id, token, uris);
};

/**
 * Remove item from playlist
 */
export const removeItemFromPlaylist = async (id, uri, token) => {
  if (isGuestMode()) {
    return Promise.reject(new Error('This feature requires login. Please log in to modify playlists.'));
  }
  return helper.RemoveItemToPlaylist(id, token, uri);
};

/**
 * Unfollow playlist
 */
export const unfollowPlaylist = async (id, token) => {
  if (isGuestMode()) {
    return Promise.reject(new Error('This feature requires login. Please log in to manage playlists.'));
  }
  return helper.UnfollowPlaylist(id, token);
};
