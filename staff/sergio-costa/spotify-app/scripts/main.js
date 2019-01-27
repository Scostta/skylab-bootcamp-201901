spotifyApi.token = 'BQB0c-_SOHP4E9yHdv35Ib2jz7y-4eOnlmpu0BtAkJIjptWLA3J0H-L1DZFi4aguvWMG39ASWckxUxOfUlnRrSme3tSlbApiQRpf3OmZAJYDjQSGw6vZQhlCbKsrgxWpEFq4yRW5RAKVZC7S'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const uniqueTrackPanel = new UniqueTrackPanel
const loginPanel = new LoginPanel

const $root = $('#root')
const $header = $('header')

artistsPanel.hide()
albumPanel.hide()
tracksPanel.hide()
uniqueTrackPanel.hide()
searchPanel.hide()

$root.append(loginPanel.$container)
$header.append(searchPanel.$container)
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

loginPanel.onLogin = function (email, password){
    try {
        logic.login(email, password, function(){
            loginPanel.hide()
            loginPanel.clear()

            searchPanel.show()
        })
    } catch (err) {
        
    }
}


