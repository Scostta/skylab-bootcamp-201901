spotifyApi.token = 'Bearer BQD1lO1GX7gCZKqucUZj6FlR1MTPijcIejpsGDbEZYJq5nAqEXKODY561K_F7AERqBR6qMMezn7fGv6YMp5ZTZxXcufHoHxHouyLpXA7JR0FwY5hNRE4WF8itrwl7OCehTIbpOZjooOiUeWg'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel

const $root = $('#root');

artistsPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)

searchPanel.onSearch = function(query){
    try {
        logic.searchArtists(query, function(error, artists){
            if(error) searchPanel.error = error;
            else{
                artistsPanel.artists = artists;

                artistsPanel.show()
            }
        })
    } catch (err) {
        
    }
}