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

  state = {  
  loginVisible: true, 
  registerVisible: false, 
  searchVisible: false, 
  artistsVisible:false,
  albumsVisible:false,
  tracksVisible:false,
  uniqueTrackVisible:false,
  artistList: [], 
  albumsList:[], 
  trackList:[], 
  track:null,
  user:null,
  feedback: '',
  userEmail:'',
  favState: false
}

  handleLogin = (email, password) => {
      try {
          logic.login(email, password, (user) => {
              this.setState({ loginVisible: false, searchVisible: true, feedback: '', user: user, userEmail: user.email})
          })
      } catch (err) {
          this.setState({ feedback: err.message })
          console.log(err.message)
      }

  }

  handleRegister = (name, surname, email, password, passwordConfirm) => {
      try {
          logic.register(name, surname, email, password, passwordConfirm, () => {
              this.setState({ loginVisible: true, registerVisible:false, feedback: '' })
          })
      } catch (err) {
          this.setState({ feedback: err.message })
      }
  }

  handleLogout = () => {
      this.setState({uniqueTrackVisible: false, tracksVisible: false, albumsVisible: false, artistsVisible:false, searchVisible:false, loginVisible: true, user:null})
  }

  handleLoginToRegister = () => {
      this.setState({ loginVisible: false, registerVisible: true, feedback: '' })
  }

  handleResgisterToLogin = () => {
      this.setState({ registerVisible: false, loginVisible: true, feedback: '' })
  }

  handleSearch = (query) => {
      try {
          logic.searchArtists(query, (error, artistList) => {
              if (error) console.log(error)
              else {
                  this.setState({ artistList, artistsVisible: true, feedback:'' })
              }
          })
      } catch (err) {
          this.setState({ feedback: err.message })
      }
  }

  handleOnGoBack = () => {
      this.setState({tracksVisible: false, albumsVisible: true, artistsVisible:true})
  }

  loadAlbums = id => {
      try {
          logic.retrieveAlbums(id, (error, albumsList) => {
              if(error) console.log(error)
              else {
                  this.setState({ albumsList, albumsVisible: true })
              }
          })
      } catch (err) {
          console.log('error')
      }
  }

  loadTracks = id => {
      try {
          logic.retrieveTracks(id, (error, trackList) => {
              if(error) console.log(error)
              else{
                  this.setState({ trackList, albumsVisible: false, artistsVisible: false ,tracksVisible: true })
              }
          })
      } catch (err) {
          console.log('error')
      }
  }

  uniqueTrack = id => {
      try {
          logic.retrieveUniqueTrack(id, (error, track) => {
              if(error) console.log(error)
              else{
                  this.setState({track , uniqueTrackVisible: true})
              }
          })
      } catch (err) {
          console.log('error')
      }
  }

  handleOnFav = id => {
      try {
          logic.toogleFavs(id, this.state.userEmail, (favState)=> {
            debugger
              this.setState({favState})
          })
      } catch (err) {
          
      }
  }

  render() {

      const { handleOnFav, handleSearch, handleOnGoBack, uniqueTrack,loadTracks, loadAlbums, handleResgisterToLogin, handleLoginToRegister, handleLogin, handleRegister, handleLogout, state: { feedback, loginVisible, registerVisible, searchVisible, artistsVisible, albumsVisible, tracksVisible, uniqueTrackVisible, user, artistList, albumsList, trackList, track, favState } } = this

      return <section>
          <Header handleSearch={handleSearch} searchVisible={searchVisible} user={user} onLogout={handleLogout}/>
          {loginVisible && <Login onLogin={handleLogin} onGoToRegister={handleLoginToRegister} />}
          {registerVisible && <Register onRegister={handleRegister} onGoToLogin={handleResgisterToLogin} />}
          {artistsVisible && <Artists artistList={artistList} onArtistSelect= {loadAlbums}/>}
          {albumsVisible && <Albums albumsList={albumsList} onAlbumSelect = {loadTracks}/>}
          {tracksVisible && <Tracks trackList={trackList} onTrackSelect={uniqueTrack} onGoBack={handleOnGoBack}/>}
          {uniqueTrackVisible && <Track track={track} onFav={handleOnFav} favState={favState}></Track>}
          {!!feedback && <Feedback message={feedback} />}
      </section>
  }
}

export default App;
