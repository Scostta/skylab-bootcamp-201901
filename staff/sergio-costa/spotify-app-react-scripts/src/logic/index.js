'use strict'

import spotifyApi from '../spotify-api'
import userApi from '../user-api';

const logic = {

    __userId__:null,
    __userApiToken__:null,

    loginUser(email, password) {

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw Error('password is empty')

        return userApi.auth(email, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
            })

    },

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(({id, name, surname, username}) => ({
                id,
                name,
                surname,
                email: username
            }))
    },

//TODO updateUser and removeUser

    register: function (name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string');

        if (!name.trim().length) throw Error('name cannot be empty');

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');

        if (!surname.trim().length) throw Error('surname cannot be empty');

        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');

        if (!password.trim().length) throw Error('password cannot be empty');

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string');

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty');

        return userApi.register(name, surname, email, password)
            .then(() => {})
    },

    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')


        spotifyApi.searchArtists(query)
    },

    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')


        spotifyApi.retrieveAlbums(artistId)
    },

    retrieveTracks(albumId) {

        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')


        spotifyApi.retrieveTracks(albumId)
    },

    retrieveUniqueTrack(tracksId) {
        if (typeof tracksId !== 'string') throw TypeError(`${tracksId} is not a string`)

        if (!tracksId.trim().length) throw Error('tracksId is empty')

        spotifyApi.retrieveUniqueTrack(tracksId)
    },

    // toogleFavs(id, email, callback) {

    //     var favState

    //     var user = users.find(function (user) {
    //         return user.email === email
    //     })

    //     console.log(user)
    //     if (user) {
    //         var index = user.favorites.indexOf(id)
    //         console.log(index)
    //         if (index === -1) {
    //             user.favorites.push(id)
    //             favState=true
    //         } else {
    //             user.favorites.splice(index, 1)
    //             favState=false
    //         }
    //     }

    //     callback(favState);
    // }

}

export default logic