spotifyApi.token = 'BQBHgTfFnlOXe9_N6SqOvnRzzCVzPQ9VZETZdKmY97xqEcOX5ePER21eUFh1eyubGcyKwvTu1Vg4nUTPI30_M2RyzZ6-QpWA3pPBhwp_tmC3745z6dWHoE4MA7uUXjY0PCEvqQQeg2foOIjJ'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const tracksPanel = new TracksPanel
const uniqueTrackPanel = new UniqueTrackPanel

const $root = $('#root')
const $header = $('header')

artistsPanel.hide()
albumPanel.hide()
tracksPanel.hide()
uniqueTrackPanel.hide()

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
    uniqueTrackPanel.clear()
    uniqueTrackPanel.hide()

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

    artistsPanel.clear()
    albumPanel.clear()
    artistsPanel.hide()
    albumPanel.hide()

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




