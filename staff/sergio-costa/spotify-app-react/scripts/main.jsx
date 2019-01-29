spotifyApi.token = "BQC87a3PKtZBygDfi_0w0L6pnI5bTmyP56amMe9C057hVfUBXGWT0xIv-CuwqtG9JL9Ldg4AuhtXajg83-A1hK2iUZG1qJB9K3Rh3q4KQsbilHr4gGtLgQwt2VnXnCvt-nGi4KhoirfpkPM4"

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

        return <section className="login">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" onChange={handleEmailInput} />
                <input type="password" name="password" placeholder="password" onChange={handlePasswrodInput} />
                <button>Login</button>
            </form>
            <button onClick={hanldeGoToRegister}>Go To Register</button>
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

        return <section>
            <h2>Register</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" placeholder="name" onChange={handleInput} />
                <input type="text" name="surname" placeholder="surname" onChange={handleInput} />
                <input type="email" name="email" placeholder="email" onChange={handleInput} />
                <input type="password" name="password" placeholder="password" onChange={handleInput} />
                <input type="password" name="passwordConfirm" placeholder="passwordConfirm" onChange={handleInput} />
                <button>Register</button>
            </form>
            <button onClick={handleGoToLogin}>Go To Login</button>
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

        return <section>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="query" placeholder="search an artist..." onChange={handleSearchInput} />
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

        return <section>
            <h3>Artists</h3>
            <div>
                {artistList.map(({ id, images, name }) => {
                return<div key={id} id-data={id}>
                        <img src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} onClick={() => onArtistSelected(id)} />
                        <h4>{name}</h4>
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
        
        return <section>
            <div>
                {albumsList.map(({id, name, images}) => {
                    return <div key={id}>
                        <img src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} onClick={() => onAlbumSelected(id)}/>
                        <h4>{name}</h4>
                        <button>Go To Album</button>
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

        return <section>
            <h2>Tracks</h2>
            <img src="images/back.png" />
            <ul>
                {trackList.map(({id, track_number, name}) => {
                    return <li key={id} data-id={id}>{track_number} {name}<img src="images/playbtn.png" onClick={()=>onTrackSelected(id)}/></li>
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

        return <section>
            <h5 data-id={id}>{name}</h5>
            <audio src={preview_url} controls autoPlay></audio>
        </section>
    }
}

//#endregion


//#region FeedBack
function Feedback({ message }) {
    return <section>{message}</section>
}
//#endregion


//#region APP 
class App extends React.Component {

    state = { loginFeedback: '', registerFeedback: '', searchFeedback: '', loginVisible: true, registerVisible: false, searchVisible: false, artistList: [], albumsList:[], trackList:[], track:null}

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, (user) => {
                this.setState({ loginVisible: false, searchVisible: true, loginFeedback: '' })
                console.log(user)
            })
        } catch (err) {
            this.setState({ loginFeedback: err.message })
        }

    }

    handleRegister = (name, surname, email, password, passwordConfirm) => {
        try {
            logic.register(name, surname, email, password, passwordConfirm, () => {
                this.setState({ loginVisible: true, registerFeedback: '' })
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
                    this.setState({ artistList })
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
                    this.setState({ albumsList })
                    console.log(albumsList)
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
                    this.setState({ trackList })
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
                    this.setState({track})
                }
            })
        } catch (err) {
            console.log('error')
        }
    }

    render() {

        const { uniqueTrack,loadTracks, loadAlbums,handleSearch, handleResgisterToLogin, handleLoginToRegister, handleLogin, handleRegister, state: { searchFeedback, loginFeedback, registerFeedback, loginVisible, registerVisible, searchVisible, artistList, albumsList, trackList } } = this

        return <section>
            <h1>Welcome</h1>
            {loginVisible && <Login onLogin={handleLogin} feedback={loginFeedback} onGoToRegister={handleLoginToRegister} />}
            {registerVisible && <Register onRegister={handleRegister} feedback={registerFeedback} onGoToLogin={handleResgisterToLogin} />}
            {searchVisible && <Search onSearch={handleSearch} feedback={searchFeedback} />}
            <Artists artistList={artistList} onArtistSelect= {loadAlbums}/>
            <Albums albumsList={albumsList} onAlbumSelect = {loadTracks}/>
            <Tracks trackList={trackList} onTrackSelect={uniqueTrack}/>
            <Track track></Track>
        </section>
    }
}
//#endregion

ReactDOM.render(<App />, document.getElementById('root'))