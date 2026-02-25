import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../hooks/hook';
import { exchangeCodeForToken, refreshAccessToken } from '../components/Login/spotifyAuth';

import { useHistory } from 'react-router-dom';

const SpotifyContext = createContext();
const CODE_VERIFIER_KEY = 'spotify_code_verifier';

export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotify must be used within a SpotifyProvider');
    }
    return context;
};

export const SpotifyProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || '');
    const [expiresAt, setExpiresAt] = useState(parseInt(localStorage.getItem('expires_at')) || 0);
    const [search, setSearch] = useState('');

    const { data: user, loading: userLoading, err: userError } = UserProfile(token);

    const saveTokenData = useCallback((data) => {
        const { access_token, refresh_token, expires_in } = data;
        const expiryTime = Date.now() + expires_in * 1000;

        setToken(access_token);
        localStorage.setItem('token', access_token);

        if (refresh_token) {
            setRefreshToken(refresh_token);
            localStorage.setItem('refresh_token', refresh_token);
        }

        setExpiresAt(expiryTime);
        localStorage.setItem('expires_at', expiryTime);
    }, []);


    // Automatic Token Refresh Logic
    useEffect(() => {
        if (!refreshToken || !expiresAt) return;

        const checkAndRefresh = () => {
            const now = Date.now();
            // Refresh 5 minutes before expiry
            const timeUntilExpiry = expiresAt - now;
            const refreshThreshold = 5 * 60 * 1000;

            if (timeUntilExpiry < refreshThreshold) {
                console.log('Refreshing token...');
                refreshAccessToken(refreshToken)
                    .then(data => {
                        console.log('Token refreshed successfully');
                        saveTokenData(data);
                    })
                    .catch(err => {
                        console.error('Failed to refresh token:', err);
                        // If refresh fails, user might need to log in again
                        if (err.message.includes('invalid_grant')) {
                            logout();
                        }
                    });
            }
        };

        // Check every minute
        const intervalId = setInterval(checkAndRefresh, 60 * 1000);
        checkAndRefresh(); // Initial check

        return () => clearInterval(intervalId);
    }, [refreshToken, expiresAt, saveTokenData]);

    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    const history = useHistory();

    // Manual history tracking for navigation arrows
    useEffect(() => {
        const unlisten = history.listen((location, action) => {
            // Simple heuristic for RRv5: 
            // - If PUSH, we moved forward, back is likely possible. Forward is definitely NOT possible (unless we just came back).
            // - If POP, we could have gone back OR forward.
            // Spotify's forward button logic: If we go back, we can go forward until we push a new route.
            
            if (action === 'PUSH') {
                setCanGoBack(true);
                setCanGoForward(false);
            } else if (action === 'POP') {
                // When POP happens, it's ambiguous. 
                // However, we can track if we've ever triggered a "back" action.
                // For now, let's just make it simpler: NavigationArrows will set these.
            }
        });
        return () => unlisten();
    }, [history]);

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setToken('');
        setRefreshToken('');
        setExpiresAt(0);
        window.location.href = '/';
    };

    const value = {
        token,
        refreshToken,
        expiresAt,
        setToken,
        user,
        userLoading,
        userError,
        logout,
        canGoBack,
        setCanGoBack,
        canGoForward,
        setCanGoForward,
        search,
        setSearch
    };

    return (
        <SpotifyContext.Provider value={value}>
            {children}
        </SpotifyContext.Provider>
    );
};
