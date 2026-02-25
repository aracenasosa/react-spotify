/**
 * Session Manager
 * Manages application mode state (Guest vs Authenticated)
 * Persists mode preference to localStorage
 */

const GUEST_MODE_KEY = 'guest_mode';

/**
 * Check if the application is currently in guest mode
 * @returns {boolean} True if guest mode is active
 */
export const isGuestMode = () => {
  try {
    return localStorage.getItem(GUEST_MODE_KEY) === 'true';
  } catch (error) {
    console.error('Error reading guest mode from localStorage:', error);
    return false;
  }
};

/**
 * Activate guest mode
 * Sets the guest_mode flag in localStorage
 */
export const activateGuestMode = () => {
  try {
    localStorage.setItem(GUEST_MODE_KEY, 'true');
  } catch (error) {
    console.error('Error activating guest mode:', error);
    throw new Error('Failed to activate guest mode. Please check your browser settings.');
  }
};

/**
 * Activate authenticated mode
 * Removes the guest_mode flag from localStorage
 */
export const activateAuthenticatedMode = () => {
  try {
    localStorage.removeItem(GUEST_MODE_KEY);
  } catch (error) {
    console.error('Error activating authenticated mode:', error);
  }
};

/**
 * Clear guest mode state
 * Alias for activateAuthenticatedMode
 */
export const clearGuestMode = () => {
  try {
    localStorage.removeItem(GUEST_MODE_KEY);
  } catch (error) {
    console.error('Error clearing guest mode:', error);
  }
};

/**
 * Initialize mode from storage
 * Checks localStorage and returns the current mode
 * @returns {'guest' | 'authenticated'} Current application mode
 */
export const initializeMode = () => {
  try {
    return isGuestMode() ? 'guest' : 'authenticated';
  } catch (error) {
    console.error('Error initializing mode:', error);
    return 'authenticated';
  }
};
