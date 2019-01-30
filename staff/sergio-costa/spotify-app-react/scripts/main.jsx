spotifyApi.token = "BQDoaJFQOU4U3uNC-BwFHi1xfbPL7bY2xd-6KJTBdcSHfJKKYDhXhuf59vGdSCKzc6K-s5sYdurESRpMtJF5cZr43qs-qWN-wYhK5x-b9BfLckK90yPP3xGZn0poy6XGC-tuN_AZb0lUFIKx"

//#region Login
class Login extends React.Component {

    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswrodInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    hanldeGoToRegister = () => {

        const { props: { onGoToRegister } } = this

        onGoToRegister()
    }

    render() {

        const { hanldeGoToRegister, handleFormSubmit, handleEmailInput, handlePasswrodInput} = this

        return <section className="login container">
            <h2 className="text-center mb-5">Login</h2>
            <form className="login__form" onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="col text-center">
                        <label for="email">E-mail:</label>
                        <input className="form-control" type="email" name="email" placeholder="email" onChange={handleEmailInput} />
                    </div>
                    <div className="col text-center">
                        <label for="password">Password:</label>
                        <input className="form-control" type="password" name="password" placeholder="password" onChange={handlePasswrodInput} />
                    </div>
                </div>
                <div className="col text-center">
                    <button className="btn btn-primary mt-5">Login</button>
                </div>
            </form>
            <button className="btn btn-secondary" onClick={hanldeGoToRegister}>Go To Register</button>
        </section>
    }
}
//#endregion


//#region Register
class Register extends React.Component {

    state = { name: '', surname: '', email: '', password: '', passwordConfirm: '' }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {

        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirm }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirm)
    }

    handleGoToLogin = () => {

        const { props: { onGoToLogin } } = this

        onGoToLogin()
    }


    render() {

        const { handleGoToLogin, handleInput, handleFormSubmit} = this

        return <section className="register container">
            <h2 className="text-center mb-5">Register</h2>
            <form className="register__form" onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="name">Name:</label>
                        <input className="form-control" type="text" name="name" placeholder="name" onChange={handleInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="surname">Surname:</label>
                        <input className="form-control" type="text" name="surname" placeholder="surname" onChange={handleInput} />        
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="email">E-mail:</label>
                        <input className="form-control" type="email" name="email" placeholder="email" onChange={handleInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="password">Password:</label>
                        <input className="form-control" type="password" name="password" placeholder="password" onChange={handleInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="password">Confirm Password:</label>
                        <input className="form-control" type="password" name="passwordConfirm" placeholder="passwordConfirm" onChange={handleInput} />             
                    </div>
                </div>
                <div className="col text-center">
                    <button className="btn btn-primary mt-3">Register</button>
                </div>
            </form>
            <button className="btn btn-secondary" onClick={handleGoToLogin}>Go To Login</button>
        </section>
    }
}

//#endregion


//#region Search
class Search extends React.Component {

    state = { query: '' }

    handleSearchInput = event => this.setState({ query: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {

        const { handleSearchInput, handleFormSubmit} = this

        return <section className="header__search">
            <form onSubmit={handleFormSubmit}>
                <input className="search__bar" type="text" name="query" placeholder="search an artist..." onChange={handleSearchInput} />
                <button>Search</button>
            </form>
        </section>
    }
}
//#endregion


//#region Artists
class Artists extends React.Component {

    onArtistSelected = id => {
        
        const { props: {onArtistSelect}} = this

        onArtistSelect(id)
    }

    render() {
        const { props: { artistList }, onArtistSelected } = this

        return <section className="results">
            <h3>Artists</h3>
            <div className="container__artist">
                {artistList.map(({ id, images, name }) => {
                return<div className="artist__each" key={id} id-data={id}  onClick={() => onArtistSelected(id)}>
                        <img className="artist__img bd-placeholder-img rounded-circle" width="100px" src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} />
                        <h4 className="artist__name">{name}</h4>
                    </div>
                })}
            </div>
        </section>
    }
}

//#endregion


//#region Albums
class Albums extends React.Component {

    onAlbumSelected = id => {

        const {props : {onAlbumSelect}} = this

        onAlbumSelect(id)
    }

    render(){
        const {props: {albumsList}, onAlbumSelected} = this
        
        return <section className="resultsAlbum">
            <div className="container__album">
                {albumsList.map(({id, name, images}) => {
                    return <div className="album" key={id}>
                        <img className="album__image" src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} onClick={() => onAlbumSelected(id)}/>
                        <h4 className="album__title">{name}</h4>
                        <button className="album__button"><strong>Go To Album</strong></button>
                    </div>
                })}
            </div>
        </section>
    }

}
//#endregion


//#region TrackList
class Tracks extends React.Component {

    handleGoBack = () => {
        const { props: {onGoBack}} = this

        onGoBack()
    }

    onTrackSelected = id => {
        const {props: {onTrackSelect}} = this

        onTrackSelect(id)
    }

    render(){

        const{props:{trackList}, onTrackSelected, handleGoBack} = this

        return <section className="resultTracks">
            <h2>Tracks</h2>
            <img className="tracks__button" src="images/back.png" onClick = {handleGoBack}/>
            <ul className="track__list">
                {trackList.map(({id, track_number, name}) => {
                    return <li className="track__item" key={id} data-id={id} onClick={()=>onTrackSelected(id)}>{track_number} {name}<img src="images/playbtn.png" width="40px" height="40px"/></li>
                })}
            </ul>
        </section>
    }
}

//#endregion


//#region Track
class Track extends React.Component {

    handleFav = id =>{

        const{props: {onFav}} = this

        onFav(id)
    }

    render(){
        
        const{handleFav ,props:{track:{id, preview_url, name}, favState}}=this

        return <section className="uniqueTrack">
            <h5 className="uniqueTrack-text" data-id={id}>{name}</h5>
            <audio src={preview_url} controls autoPlay></audio>
            <i className={`${favState ? `far fa-heart`: `far fa-heart red`}`} onClick={()=>handleFav(id)}></i>
        </section>
    }
}

//#endregion


//#region User
class User extends React.Component {

    handleLogoutButton = () => {
        const {props: {onLogout}} = this

        onLogout()
    }

    render(){
        const {props: {username}, handleLogoutButton} = this

        return <section className="welcomePanel">
        <img className="welcomePanel__img" src="images/person.png" />
        <p className="welcomePanel__text">{username}</p>
        <div className="dropdown">
            <img src="images/moreinfo.png" className="welcomePanel__imgInfo dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick ={handleLogoutButton}>Logout</a>
            </div>
        </div>
        </section>
    }
}

//#endregion


//#region FeedBack
function Feedback({ message }) {
    return <section className="error alert alert-danger" role="alert">{message} </section>
}
//#endregion


//#region APP 
class App extends React.Component {

    state = {  
    loginVisible: true, 
    registerVisible: false, 
    searchVisible: false, 
    artistsVisible:false,
    albumsVisible:false,
    tracksVisible:false,
    uniqueTrackVisible:false,
    usernameVisible: false,
    artistList: [], 
    albumsList:[], 
    trackList:[], 
    track:null,
    username:'',
    feedback: '',
    userEmail:'',
    favState: false
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
        this.setState({uniqueTrackVisible: false, tracksVisible: false, albumsVisible: false, artistsVisible:false, searchVisible:false, loginVisible: true, usernameVisible:false})
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
                this.setState({favState})
            })
        } catch (err) {
            
        }
    }

    render() {

        const { handleOnFav,handleOnGoBack, uniqueTrack,loadTracks, loadAlbums,handleSearch, handleResgisterToLogin, handleLoginToRegister, handleLogin, handleRegister, handleLogout, state: { feedback, loginVisible, registerVisible, searchVisible, artistsVisible, albumsVisible, tracksVisible, uniqueTrackVisible, usernameVisible, artistList, albumsList, trackList, track, username, favState } } = this

        return <section>
            <header className="header">
            <h1 className="header__text">Spotify App</h1>
            {searchVisible && <Search onSearch={handleSearch}/>}
            </header>   
            {loginVisible && <Login onLogin={handleLogin} onGoToRegister={handleLoginToRegister} />}
            {registerVisible && <Register onRegister={handleRegister} onGoToLogin={handleResgisterToLogin} />}
            {artistsVisible && <Artists artistList={artistList} onArtistSelect= {loadAlbums}/>}
            {albumsVisible && <Albums albumsList={albumsList} onAlbumSelect = {loadTracks}/>}
            {tracksVisible && <Tracks trackList={trackList} onTrackSelect={uniqueTrack} onGoBack={handleOnGoBack}/>}
            {uniqueTrackVisible && <Track track={track} onFav={handleOnFav} favState={favState}></Track>}
            {usernameVisible && <User username = {username} onLogout={handleLogout}/>}
            {!!feedback && <Feedback message={feedback} />}
        </section>
    }
}
//#endregion

ReactDOM.render(<App />, document.getElementById('root'))