import './App.css';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import {
  Home,
  Search,
  Login,
  Artist,
  SpecificAlbum,
  Playlist,
  AllPlaylist,
  BrowseCategories,
  LikedSongs,
  AllRecentlyPlayed,
  AllNewRelease,
  AllFeaturedPlaylist,
  AllArtist,
  AllAlbum,
  CreatePlaylist,
  CreatePlaylistForm,
  EditPlaylist,
  UserProfile
}
  from './components';
import React, { useState } from 'react';
import { GetToken } from './helpers/helper';
import { SpotifyProvider } from './context/SpotifyContext';

const App = () => {

  let token = GetToken('');

  if (window.location.search.split('=')[1] === 'access_denied') {
    return <Router><Redirect to='/' /></Router>
  }
  else {
    return (
      <div className="App">
        <Router>
          <SpotifyProvider>
            <Switch>

              <Route exact path="/" render={props => <Login {...props} />} />

              <Route path="/home" render={props => {
                const urlParams = new URLSearchParams(props.location.search);
                if (urlParams.get('code') || urlParams.get('error')) {
                  return <Login {...props} />;
                }
                return <Home {...props} />
              }} />

              <Route exact path="/search/" render={props => <Search {...props} />} />

              <Route exact path="/artist/:id/" render={props => <Artist {...props} />} />

              <Route exact path="/album/:id/" render={props => <SpecificAlbum {...props} />} />

              <Route exact path="/playlist/:id/" render={props => <Playlist {...props} />} />

              <Route exact path="/playlists/" render={props => <AllPlaylist {...props} />} />

              <Route exact path="/browseCategories/:id/" render={props => <BrowseCategories {...props} />} />

              <Route exact path="/likedSongs/" render={props => <LikedSongs {...props} />} />

              <Route exact path="/allRecentlyPlayed/" render={props => <AllRecentlyPlayed {...props} />} />

              <Route exact path="/allNewRelease/" render={props => <AllNewRelease {...props} />} />

              <Route exact path="/allFeaturedPlaylist/" render={props => <AllFeaturedPlaylist {...props} />} />

              <Route exact path="/allArtist/:search" render={props => <AllArtist {...props} />} />

              <Route exact path="/allAlbum/:id/" render={props => <AllAlbum {...props} />} />

              <Route exact path="/createPlaylist/" render={props => <CreatePlaylist {...props} />} />

              <Route exact path="/createPlaylistForm/" render={props => <CreatePlaylistForm {...props} />} />

              <Route exact path="/editPlaylist/:id/" render={props => <EditPlaylist {...props} />} />

              <Route exact path="/userProfile/" render={props => <UserProfile {...props} />} />

            </Switch>
          </SpotifyProvider>
        </Router>
      </div>
    );
  }
}

export default App;
