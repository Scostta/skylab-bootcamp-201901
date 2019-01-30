import React, { Component } from 'react';
import './App.css';
import logic from './logic'
import Login from './components/Login'
import HelloWorld from './components/HelloWorld'
import FeedBack from './components/Feedback'

class App extends Component {

  state = {
    loginVisible: true
  }

  handleLogin = (email, password) => {
    try {
        logic.login(email, password, (user) => {
            this.setState({ loginVisible: false, searchVisible: true, feedback: '', username: user.name, usernameVisible: true, userEmail: user.email})
        })
    } catch (err) {
        this.setState({ feedback: err.message })
        console.log(err.message)
    }

}

  render() {

    const{handleLogin, handleLoginToRegister, state: {loginVisible}} = this

    return <section>
    {/* <header className="header">
    <h1 className="header__text">Spotify App</h1>
    {searchVisible && <Search onSearch={handleSearch}/>}
    </header>    */}
    {loginVisible && <Login onLogin={handleLogin} onGoToRegister={handleLoginToRegister} />}
    {/* {registerVisible && <Register onRegister={handleRegister} onGoToLogin={handleResgisterToLogin} />}
    {artistsVisible && <Artists artistList={artistList} onArtistSelect= {loadAlbums}/>}
    {albumsVisible && <Albums albumsList={albumsList} onAlbumSelect = {loadTracks}/>}
    {tracksVisible && <Tracks trackList={trackList} onTrackSelect={uniqueTrack} onGoBack={handleOnGoBack}/>}
    {uniqueTrackVisible && <Track track={track} onFav={handleOnFav} favState={favState}></Track>}
    {usernameVisible && <User username = {username} onLogout={handleLogout}/>}
    {!!feedback && <Feedback message={feedback} />} */}
</section>
  }
}

export default App;
