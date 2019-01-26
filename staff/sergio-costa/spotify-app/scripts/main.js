spotifyApi.token = 'BQA-0GKWOyTcWtzW1cS_5gshHgAWrGcHN607PJqTLkOYzHqYUAIQuFDMmRhJR15uEaOr_0ZrAviL_2L1EmfC8iwHA2Fp_I72i364k_FWL8QmHHh2SmdivLwmj6Fsr2SaM1GjUVXE8zWIDBvO'

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

tracksPanel.onTrackSelected = function(trackId){
    try {
        logic.retrieveUniqueTrack(trackId, function(error, uniqueTrack){
            if(error) console.log(error)
            else{
                tracksPanel.hide()

                uniqueTrackPanel.uniqueTrack = uniqueTrack

                uniqueTrackPanel.show()
            }
        });
    } catch (err) {
        
    }
}




