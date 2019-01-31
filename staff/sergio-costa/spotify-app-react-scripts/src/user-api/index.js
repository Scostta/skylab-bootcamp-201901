'use strict'

const userApi = {

    register(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/user', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response
                
                if (status === 'OK') return response.data.id
                else throw Error(response.error)
            })
    },

    auth(username, password){
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/auth', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status, data } = response

                if(status === 'OK'){
                    return data
                }else{
                    throw Error(response.error)
                }
            })
    },

    retrieve(id, token){
        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method:'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                const {status, data} = response

                if(status=='OK'){
                    return data
                }else{
                    throw Error(response.error)
                }
            }) 
    },

    update(id, token, moreInfo){
        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method:'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(moreInfo)
        })
            .then(response => response.json())
            .then(response => {
                const{ data, status } = response

                if(status === 'OK') return data
                else{
                    throw Error(response.error)
                }
            })
    },

    remove(id, token, username, password){
        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method:'DEL',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
            .then(response => response.json())
            .then(response => {
                const {status, data} = response

                if(status === 'OK') return data
                else{
                    throw Error(response.error)
                }
            })
    }
}

export default userApi