import { clientId, redirectUri, tokenEndpoint } from './authorizeConf';

/**
 * Exchange authorization code for access token (PKCE flow).
 * Call this when the app loads with ?code= in the URL (callback from Spotify).
 */
export const exchangeCodeForToken = async (code, codeVerifier) => {
  const res = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.error || 'Token exchange failed');
  return data;
};

/**
 * Refresh an expired access token using the refresh_token.
 */
export const refreshAccessToken = async (refreshToken) => {
  const res = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.error || 'Token refresh failed');
  return data;
};
