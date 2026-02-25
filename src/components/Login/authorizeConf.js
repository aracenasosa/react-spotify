export const authEndpoint = "https://accounts.spotify.com/authorize";
export const tokenEndpoint = "https://accounts.spotify.com/api/token";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// Redirect URI must match EXACTLY one of the URIs in your Spotify Dashboard.
export const redirectUri = window.location.origin.replace(/\/$/, '') + '/home';

export const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-recently-played",
    "user-library-read",
    "user-library-modify",
    "playlist-modify-public",
    "playlist-modify-private"
];
