//#region Imports
import React, { Component } from 'react';
import logic from './logic'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Artists from './components/Artists'
import Albums from './components/Albums'
import Tracks from './components/TrackList'
import Track from './components/Track'
import Feedback from './components/Feedback'
//#endregion


class App extends Component {

    //#region App STATES
    state = {
        loginVisible: true,
        registerVisible: false,
        searchVisible: false,
        artistsVisible: false,
        albumsVisible: false,
        tracksVisible: false,
        uniqueTrackVisible: false,
        artistList: [],
        albumsList: [],
        trackList: [],
        track: null,
        user: null,
        feedback: '',
        userEmail: '',
        favState: false
    }
    //#endregion


    //#region App HANLDES
    handleLogin = (email, password) => {
        try {
            logic.login(email, password) 
                .then(user => {
                    this.setState({ loginVisible: false, searchVisible: true, feedback: '', user: user, userEmail: user.email })
                })
                .catch(({message}) => this.setState({ feedback: message }))
        } catch ({message}) {
            this.setState({ feedback: message })
        }

    }

    handleRegister = (name, surname, email, password, passwordConfirm) => {
        try {
            logic.register(name, surname, email, password, passwordConfirm)
                .then(() => {
                    this.setState({ loginVisible: true, registerVisible: false, feedback: '' })
                })
                .catch(({message}) => this.setState({ feedback: message }))
        } catch ({message}) {
            this.setState({ feedback: message })
        }
    }

    handleLogout = () => {
        this.setState({ uniqueTrackVisible: false, tracksVisible: false, albumsVisible: false, artistsVisible: false, searchVisible: false, loginVisible: true, user: null })
    }

    handleLoginToRegister = () => {
        this.setState({ loginVisible: false, registerVisible: true, feedback: '' })
    }

    handleResgisterToLogin = () => {
        this.setState({ registerVisible: false, loginVisible: true, feedback: '' })
    }

    handleSearch = (query) => {
        try {
            logic.searchArtists(query)
                .then(artistList => {
                    this.setState({ artistList, artistsVisible: true, feedback: '' })
                })
                .catch(({message}) => this.setState({feedback: message}))
        } catch ({message}) {
            this.setState({ feedback: message })
        }
    }

    handleOnGoBack = () => {
        this.setState({ tracksVisible: false, albumsVisible: true, artistsVisible: true })
    }

    loadAlbums = id => {
        try {
            logic.retrieveAlbums(id)
                .then(albumsList => {
                    this.setState({ albumsList, albumsVisible: true })
                })
                .catch(console.log('error'))
        } catch (err) {
            console.log('error')
        }
    }

    loadTracks = id => {
        try {
            logic.retrieveTracks(id)
                .then(trackList => {
                    this.setState({ trackList, albumsVisible: false, artistsVisible: false, tracksVisible: true })
                })
                .catch(console.log('error'))
        } catch (err) {
            console.log('error')
        }
    }

    uniqueTrack = id => {
        try {
            logic.retrieveUniqueTrack(id)
                .then(track => {
                    this.setState({ track, uniqueTrackVisible: true })
                })
                .catch(console.log('error'))
        } catch (err) {
            console.log('error')
        }
    }

    handleOnFav = id => {
        try {
            logic.toogleFavs(id, this.state.userEmail, (favState) => {
                this.setState({ favState })
            })
        } catch (err) {

        }
    }
    //#endregion


    //#region App Render
    render() {

        const { handleOnFav, handleSearch, handleOnGoBack, uniqueTrack, loadTracks, loadAlbums, handleResgisterToLogin, handleLoginToRegister, handleLogin, handleRegister, handleLogout, state: { feedback, loginVisible, registerVisible, searchVisible, artistsVisible, albumsVisible, tracksVisible, uniqueTrackVisible, user, artistList, albumsList, trackList, track, favState } } = this

        return <section>
            <Header handleSearch={handleSearch} searchVisible={searchVisible} user={user} onLogout={handleLogout} />
            {loginVisible && <Login onLogin={handleLogin} onGoToRegister={handleLoginToRegister} />}
            {registerVisible && <Register onRegister={handleRegister} onGoToLogin={handleResgisterToLogin} />}
            {artistsVisible && <Artists artistList={artistList} onArtistSelect={loadAlbums} />}
            {albumsVisible && <Albums albumsList={albumsList} onAlbumSelect={loadTracks} />}
            {tracksVisible && <Tracks trackList={trackList} onTrackSelect={uniqueTrack} onGoBack={handleOnGoBack} />}
            {uniqueTrackVisible && <Track track={track} onFav={handleOnFav} favState={favState}></Track>}
            {!!feedback && <Feedback message={feedback} />}
        </section>
    }
    //#endregion
}

export default App;
