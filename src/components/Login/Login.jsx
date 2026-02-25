import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Style from './Login.module.css';
import Spotify from '../../assets/spotifyIcon.svg';
import UnauthorizedModal from '../UnauthorizedModal/UnauthorizedModal';
import { useSpotify } from '../../context/SpotifyContext';
import {
  clientId,
  redirectUri,
  scopes,
  authEndpoint,
} from './authorizeConf';
import { exchangeCodeForToken } from './spotifyAuth';
import {
  generateRandomString,
  sha256,
  base64urlEncode,
} from '../../helpers/pkce';

const CODE_VERIFIER_KEY = 'spotify_code_verifier';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { activateGuestMode } = useSpotify();
  const [authError, setAuthError] = useState('');
  const [exchanging, setExchanging] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  // Check if we need to show the unauthorized modal
  useEffect(() => {
    const shouldShowModal = localStorage.getItem('show_unauthorized_modal');
    if (shouldShowModal === 'true') {
      setShowUnauthorizedModal(true);
      localStorage.removeItem('show_unauthorized_modal');
    }
  }, []);

  // Handle callback from Spotify: ?code=... or ?error=...
  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error) {
      setAuthError(error === 'access_denied' ? 'Access denied.' : error);
      return;
    }

    if (!code) {
      return;
    }

    const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_KEY);
    if (!codeVerifier) {
      setAuthError('Missing code verifier. Please try logging in again.');
      return;
    }

    setExchanging(true);
    exchangeCodeForToken(code, codeVerifier)
      .then((data) => {
        sessionStorage.removeItem(CODE_VERIFIER_KEY);
        
        // Save token data directly to localStorage
        const { access_token, refresh_token, expires_in } = data;
        const expiryTime = Date.now() + (expires_in || 3600) * 1000;

        localStorage.setItem('token', access_token);
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token);
        }
        localStorage.setItem('expires_at', expiryTime.toString());

        // Redirect clean
        window.location.href = window.location.origin + '/home';
      })
      .catch((err) => {
        sessionStorage.removeItem(CODE_VERIFIER_KEY);
        setAuthError(err.message || 'Token exchange failed.');
        setExchanging(false);
      });
  }, [location.search, history]);

  const handleLogin = async () => {
    localStorage.clear();
    try {
      const codeVerifier = generateRandomString(64);
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64urlEncode(hashed);
      sessionStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

      const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: scopes.join(' '),
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        show_dialog: 'true',
      });

      const finalUrl = authEndpoint + '?' + params.toString();
      console.group('--- SPOTIFY LOGIN DEBUG ---');
      console.log('Client ID:', clientId);
      console.log('Redirect URI (Used):', redirectUri);
      console.log('Origin:', window.location.origin);
      console.log('Scopes:', scopes.join(' '));
      console.log('Full Auth URL:', finalUrl);
      console.groupEnd();

      window.location.href = finalUrl;
    } catch (err) {
      console.error('Login error:', err);
      setAuthError('Failed to initialize login flow.');
    }
  };

  const handleCloseModal = () => {
    setShowUnauthorizedModal(false);
  };

  const handleContinueAsGuest = () => {
    setShowUnauthorizedModal(false);
    activateGuestMode();
  };

  if (exchanging) {
    return (
      <section className={Style.container}>
        <form className={Style.form}>
          <img className={Style.App_logo} src={Spotify} alt="Spotify Logo" />
          <p style={{ color: '#fff' }}>Completing login…</p>
        </form>
      </section>
    );
  }

  return (
    <section className={Style.container}>
      <UnauthorizedModal 
        isOpen={showUnauthorizedModal} 
        onClose={handleCloseModal}
        onContinueAsGuest={handleContinueAsGuest}
      />
      
      <form className={Style.form}>
        <img className={Style.App_logo} src={Spotify} alt="Spotify Logo" />
        {authError && (
          <p style={{ color: '#ff6b6b', marginBottom: '12px' }}>{authError}</p>
        )}
        <button type="button" className={Style.loginButton} onClick={handleLogin}>
          LOG IN WITH SPOTIFY
        </button>
        
        <div className={Style.divider}>or</div>
        
        <button 
          type="button" 
          className={Style.guestButton}
          onClick={handleContinueAsGuest}
        >
          CONTINUE AS GUEST
        </button>
      </form>
    </section>
  );
};

export default Login;
