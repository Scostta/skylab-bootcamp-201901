spotifyApi.token = 'BQDhsHI-_xECkXtZRA4FGI6jjanXc3EUjm14L1bX1U15qD1rdpRfSDjO0Dz4LebuKA96rcX0aFrdDQdm7C2dGltrHKFTtarNUx_2ztTj2P3h9uNfY_NhpFP9iS4tD-fUl4GWNl-qG2xlgFZd'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const uniqueTrackPanel = new UniqueTrackPanel
const loginPanel = new LoginPanel
const welcomePanel = new WelcomePanel
const registerPanel = new RegisterPanel
const errorPanel = new ErrorPanel

const $root = $('#root')
const $header = $('header')

artistsPanel.hide()
albumPanel.hide()
tracksPanel.hide()
uniqueTrackPanel.hide()
searchPanel.hide()
welcomePanel.hide()
registerPanel.hide()
errorPanel.hide()

$root.append(loginPanel.$container)
$root.append(registerPanel.$container)
$header.append(searchPanel.$container)
$root.append(welcomePanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumPanel.$container)
$root.append(tracksPanel.$container)
$root.append(uniqueTrackPanel.$container)

searchPanel.onSearch = function(query) {

    artistsPanel.clear()
    albumPanel.clear()
    albumPanel.hide()
    tracksPanel.clear()
    tracksPanel.hide()

    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) searchPanel.error = error.message
            else {
                artistsPanel.artists = artists

                artistsPanel.show()
            }
        })
    } catch(err) {
        console.log('error')
    }
}

artistsPanel.onArtistSelected = function(artistId){

    albumPanel.clear()

    try {
        logic.retrieveAlbums(artistId, function(error, albums){
            if(error) console.log(error)
            else{
                
                albumPanel.albums = albums

                albumPanel.show()
            }
        })
    } catch (err) {
        console.log('error')
    }
}

albumPanel.onAlbumSelected = function(albumId){

    artistsPanel.hide()
    albumPanel.hide()
    searchPanel.clear()

    try {
        logic.retrieveTracks(albumId, function(error, tracks){
            if(error) console.log(error)
            else{
                albumPanel.hide()

                tracksPanel.tracks = tracks

                tracksPanel.show()
            }
        })
    } catch (err) {
        
    }
}

tracksPanel.onTrackSelected = function(trackId){
    try {

        uniqueTrackPanel.clear()

        logic.retrieveUniqueTrack(trackId, function(error, uniqueTrack){
            if(error) console.log(error)
            else{

                uniqueTrackPanel.uniqueTrack = uniqueTrack

                uniqueTrackPanel.show()
            }
        });
    } catch (err) {
        
    }
}

tracksPanel.onGoBack = function(){
    tracksPanel.clear()
    tracksPanel.hide()
    albumPanel.show()
    artistsPanel.show()
}

loginPanel.onLogin = function(email, password) {

    try {
        logic.login(email, password, function(user) {
            loginPanel.hide()
            searchPanel.show()
            welcomePanel.show()
            welcomePanel.user = user

            loginPanel.clear()
        })
    } catch(err) {
        loginPanel.error = err.message
    }
}

loginPanel.onGoToRegister = function() {
    loginPanel.hide();
    loginPanel.clear();

    registerPanel.show();
};

registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation) {
    try {
        logic.register(name, surname, email, password, passwordConfirmation, function() {
            registerPanel.hide();
            registerPanel.clear();

            loginPanel.show();
        });
    } catch(err) {
        registerPanel.error = err.message
    }
};

registerPanel.onGoToLogin = function() {
    registerPanel.hide();
    registerPanel.clear();

    loginPanel.show();
};


welcomePanel.onLogout = function(){
    searchPanel.hide()
    searchPanel.clear()

    artistsPanel.hide()
    artistsPanel.clear()

    albumPanel.hide()
    albumPanel.clear()

    tracksPanel.hide()
    tracksPanel.clear()

    uniqueTrackPanel.hide()
    uniqueTrackPanel.clear()

    welcomePanel.hide()

    loginPanel.show()
}



