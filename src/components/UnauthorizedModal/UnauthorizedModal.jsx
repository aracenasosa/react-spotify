import React from 'react';
import Style from './UnauthorizedModal.module.css';

const UnauthorizedModal = ({ isOpen, onClose, onContinueAsGuest }) => {
    if (!isOpen) return null;

    return (
        <div className={Style.modalOverlay}>
            <div className={Style.modalContent}>
                <button className={Style.closeButton} onClick={onClose} aria-label="Close modal">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                
                <div className={Style.modalBody}>
                    <div className={Style.iconContainer}>
                        <i className="fas fa-lock fa-3x"></i>
                    </div>
                    
                    <h2 className={Style.title}>Access Restricted</h2>
                    
                    <p className={Style.message}>
                        It looks like your Spotify account is not authorized to use this application yet.
                    </p>
                    
                    <p className={Style.message}>
                        This app is currently running in <strong>Spotify Development Mode</strong>, which means only pre-approved users can log in.
                    </p>
                    
                    <p className={Style.message}>
                        If you'd like access, please contact me with your Spotify account email and I'll add you to the authorized users list.
                    </p>
                    
                    <div className={Style.divider}>
                        <span>OR</span>
                    </div>
                    
                    <button className={Style.guestButton} onClick={onContinueAsGuest} aria-label="Continue as guest">
                        Continue as Guest
                    </button>
                    
                    <p className={Style.guestNote}>
                        Explore the app with sample data without logging in
                    </p>
                    
                    <p className={Style.thankYou}>
                        Thank you for your understanding!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedModal;
