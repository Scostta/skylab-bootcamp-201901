spotifyApi.token = "BQAvtQP0t7OzbrIfUBolJUIc-vpVzFXftHvQtMINuhHAY_WLDekGdWda66a5JVe05IELeMvrHSxfju2lEesFy7fH0sBtALQrNfeEGDe5U2baEVG3yi18zMFiMcOg5omFSXh1OvONGigurhoB"

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

        const { hanldeGoToRegister, handleFormSubmit, handleEmailInput, handlePasswrodInput, props: { feedback } } = this

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
            {feedback && <Feedback message={feedback} />}
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

        const { handleGoToLogin, handleInput, handleFormSubmit, props: { feedback } } = this

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
            {feedback && <Feedback message={feedback} />}
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

        const { handleSearchInput, handleFormSubmit, props: { feedback } } = this

        return <section className="header__search">
            <form onSubmit={handleFormSubmit}>
                <input className="search__bar" type="text" name="query" placeholder="search an artist..." onChange={handleSearchInput} />
                <button>Search</button>
            </form>
            {feedback && <Feedback message={feedback} />}
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

        return <section class="results">
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

    onTrackSelected = id => {
        const {props: {onTrackSelect}} = this

        onTrackSelect(id)
    }

    render(){

        const{props:{trackList}, onTrackSelected} = this

        return <section className="resultTracks">
            <h2>Tracks</h2>
            <img className="tracks__button" src="images/back.png" />
            <ul className="track__list">
                {trackList.map(({id, track_number, name}) => {
                    return <li className="track__item" key={id} data-id={id}>{track_number} {name}<img src="images/playbtn.png" width="40px" height="40px" onClick={()=>onTrackSelected(id)}/></li>
                })}
            </ul>
        </section>
    }
}

//#endregion


//#region Track
class Track extends React.Component {

    
    render(){
        
        const{props:{track:{id, preview_url, name}}}=this

        return <section className="uniqueTrack">
            <h5 className="uniqueTrack-text" data-id={id}>{name}</h5>
            <audio src={preview_url} controls autoPlay></audio>
        </section>
    }
}

//#endregion


//#region FeedBack
function Feedback({ message }) {
    return <section className="error alert alert-danger" role="alert">{message}</section>
}
//#endregion


//#region APP 
class App extends React.Component {

    state = { loginFeedback: '', 
    registerFeedback: '', 
    searchFeedback: '', 
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
    track:null

}

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, (user) => {
                this.setState({ loginVisible: false, searchVisible: true, loginFeedback: '' })
            })
        } catch (err) {
            this.setState({ loginFeedback: err.message })
        }

    }

    handleRegister = (name, surname, email, password, passwordConfirm) => {
        try {
            logic.register(name, surname, email, password, passwordConfirm, () => {
                this.setState({ loginVisible: true, registerVisible:false, registerFeedback: '' })
            })
        } catch (err) {
            this.setState({ registerFeedback: err.message })
        }
    }

    handleLoginToRegister = () => {
        this.setState({ loginVisible: false, registerVisible: true, loginFeedback: '' })
    }

    handleResgisterToLogin = () => {
        this.setState({ registerVisible: false, loginVisible: true, registerFeedback: '' })
    }

    handleSearch = (query) => {
        try {
            logic.searchArtists(query, (error, artistList) => {
                if (error) console.log(error)
                else {
                    this.setState({ artistList, artistsVisible: true })
                }
            })
        } catch (err) {
            this.setState({ searchFeedback: err.message })
        }
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
                    console.log(trackList)
                }
            })
        } catch (err) {
            console.log('error')
        }
    }

    uniqueTrack = id => {
        try {
            retrieveUniqueTrack(id, (error, track) => {
                if(error) console.log(error)
                else{
                    this.setState({track , uniqueTrackVisible: true})
                }
            })
        } catch (err) {
            console.log('error')
        }
    }

    render() {

        const { uniqueTrack,loadTracks, loadAlbums,handleSearch, handleResgisterToLogin, handleLoginToRegister, handleLogin, handleRegister, state: { searchFeedback, loginFeedback, registerFeedback, loginVisible, registerVisible, searchVisible, artistsVisible, albumsVisible, tracksVisible, uniqueTrackVisible, artistList, albumsList, trackList } } = this

        return <section>
            <h1>Welcome</h1>
            {loginVisible && <Login onLogin={handleLogin} feedback={loginFeedback} onGoToRegister={handleLoginToRegister} />}
            {registerVisible && <Register onRegister={handleRegister} feedback={registerFeedback} onGoToLogin={handleResgisterToLogin} />}
            {searchVisible && <Search onSearch={handleSearch} feedback={searchFeedback} />}
            {artistsVisible && <Artists artistList={artistList} onArtistSelect= {loadAlbums}/>}
            {albumsVisible && <Albums albumsList={albumsList} onAlbumSelect = {loadTracks}/>}
            {tracksVisible && <Tracks trackList={trackList} onTrackSelect={uniqueTrack}/>}
            {uniqueTrackVisible && <Track track></Track>}
        </section>
    }
}
//#endregion

ReactDOM.render(<App />, document.getElementById('root'))