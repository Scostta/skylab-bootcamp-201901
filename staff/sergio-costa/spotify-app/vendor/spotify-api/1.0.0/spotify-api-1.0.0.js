'use strict';

/**
 * Duckling API client.
 * 
 * @version 1.0.0
 */
const spotifyApi = {
    token: 'NO-TOKEN', 
    

    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    searchArtists(query, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: `Bearer${token}`

            }

        })

            .then(res => res.json())
            .then(({artists: {items}}) => callback(undefined, items)) 
    }, 

    retrieveAlbums(artistId, callback){
        fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET', 
            headers:{
                authorization: `Bearer${token}`

            }
        })

            .then(res => res.json())
            .then(({items}) => callback(items))
    }
}