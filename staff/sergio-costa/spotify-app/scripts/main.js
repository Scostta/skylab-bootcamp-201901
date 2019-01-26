spotifyApi.token = 'BQB0YSaSLPm4tkUzuOagXoZqw6RUkK9_N7IfFaqMa084-drMa0s5_ScU86XyObZ0ey4PWuFrEoU7HLEp91_VwPzsDkHOYuvwhMZoRzQObM5DLDKsEk3b8nR_AKmteBi7I1ajI0MIW_N631v7'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const uniqueTrackPanel = new UniqueTrackPanel

const $root = $('#root')

artistsPanel.hide()
albumPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumPanel.$container)
$root.append(tracksPanel.$container)
$root.append(uniqueTrackPanel.$container)

searchPanel.onSearch = function(query) {
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
    try {
        logic.retrieveAlbums(artistId, function(error, albums){
            if(error) console.log(error)
            else{
                artistsPanel.hide()
                
                albumPanel.albums = albums

                albumPanel.show()
            }
        })
    } catch (err) {
        console.log('error')
    }
}

albumPanel.onAlbumSelected = function(albumId){
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




