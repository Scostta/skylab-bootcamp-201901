spotifyApi.token = 'BQAnJuREDLx0aj9RJNxMkv12xz7YsDVSl9F8JHFThn6-6yEkElBUkyn7Z-nG1TXu8qROgtfoSFg4nstmPALgvK6P5lXmIXVj0j6HHLPj4TIrhGZFOigebBe8ovvlFQFqdiNkTZUyb1XmcznK'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const uniqueTrackPanel = new UniqueTrackPanel
const loginPanel = new LoginPanel
const welcomePanel = new WelcomePanel
const registerPanel = new RegisterPanel

const $root = $('#root')
const $header = $('header')

artistsPanel.hide()
albumPanel.hide()
tracksPanel.hide()
uniqueTrackPanel.hide()
searchPanel.hide()
welcomePanel.hide()
registerPanel.hide()

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
        console.log(err)
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
        console.log('error')
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



