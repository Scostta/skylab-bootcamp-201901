const logic = {
    /**
     * Search artists.
     * 
     * @param {string} query 
     * @param {function} callback 
     */
    searchArtists(query, callback) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if(!query.trim().length) throw Error('query is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.searchArtists(query, callback)
    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId 
     * @param {function} callback 
     */
    retrieveAlbums(artistId, callback) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if(!artistId.trim().length) throw Error('artistId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

    retrieveTracks(albumId, callback){

        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if(!albumId.trim().length) throw Error('albumId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveTracks(albumId, callback)
    },

    retrieveUniqueTrack(tracksId, callback){
        if (typeof tracksId !== 'string') throw TypeError(`${tracksId} is not a string`)

        if(!tracksId.trim().length) throw Error('tracksId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveUniqueTrack(tracksId, callback)
    },
    
    login(email, password, callback){
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if(!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if(!password.trim().length) throw Error('password is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        var user = users.find(user, function(user){
           return users.email === email
        })

        if (!user) throw Error('user ' + email + ' not found');

        if (user.password !== password) throw Error('wrong password');

        var loggedInUser = {
            name: user.name,
            surname: user.surname,
            email: user.email
        };

        callback(loggedInUser);
    }
}