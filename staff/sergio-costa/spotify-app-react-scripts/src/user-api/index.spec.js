'use strict'

import userApi from '.'

describe('user api', () => {
    const username = `sergio-${Math.random()}`
    const password = '123'

    describe('register', () => {

        it('should succeed on correct data', () =>
            userApi.register(username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )

    })

    describe('auth', () => {

        it('should return id and token', () =>
            userApi.auth(username, password)
                .then(data => {
                    expect(data.id).toBeDefined()
                    expect(data.token).toBeDefined()
                })
                .catch(error => expect(error).toBeUndefined())
        )

        it('should not return a token', () =>
            userApi.auth('hola', password)
                .then(() => {
                    throw Error('should no have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${'hola'}\" does not exist`)
                })
        )
    })

    describe('retrieve', () => {

        it('should return username and id', () =>

            userApi.auth(username, password)
                .then(data => {
                    return userApi.retrieve(data.id, data.token)
                        .then(user => {
                            expect(user.id).toBeDefined()
                            expect(user.username).toBeDefined()
                            expect(user.username).toBe(username)
                        })
                        .catch(error => {
                            expect(error).toBeUndefined()
                        })
                })
        )

        it('should fail if the id is incorrect', () =>

            userApi.auth(username, password)
                .then(data => {
                    return userApi.retrieve('sadasdasd', data.token)
                        .then(() => {
                            throw Error('should not have passed by here')
                        })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error.message).toBe(`token id \"${data.id}\" does not match user \"sadasdasd\"`)
                        })
                })
        )

        it('should fail if the token is null or incorrect', () =>

            userApi.auth(username, password)
                .then(data => {
                    return userApi.retrieve(data.id, )
                        .then(() => {
                            throw Error('should not have passed by here')
                        })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error.message).toBe('invalid token')
                        })
                })
        )

    })

    describe('update', () => {

        it('should add new info', () => 
        
            userApi.auth(username, password)
                .then(data => {
                    return userApi.update(data.id, data.token, {surname: 'costa', age:21})
                        .then(res => expect(res).toBeTruthy())
                        .then(() => 
                        userApi.retrieve(data.id, data.token)
                            .then((info) => {
                                expect(info.surname).toBe('costa')
                                expect(info.age).toBe(21)
                            })
                        )
                })
        
        )

        it('should fail on invalid token', () => 
                userApi.auth(username, password)
                    .then(data => {
                        return userApi.update(data.id, 'asd', {hola: 'adios'})
                            .then(() => {
                                throw Error('should not pass by here')
                            })
                            .catch(error => {
                                expect(error).toBeDefined()
                                expect(error.message).toBe(`invalid token`)
                            })
                    })
        )
    })

    describe('remove', () => {

        it('should remove the user', () =>
            userApi.auth(username, password)
                .then(data => {
                    return userApi.remove(data.id, data.token, username, password)
                    .then(res => expect(res).toBeTruthy())
                        .then(() => 
                            userApi.register(username, password)
                                .then(id => expect(id).toBeDefined())
                        )
                })
        )

        it('should do not remove with incorrect id', () => 
            userApi.auth(username, password)
                .then(data => {
                    return userApi.remove('asd', data.token, username, password)
                        .then(() => {
                            throw Error('should not pass by here')
                        })
                        .catch(error => {
                            expect(error).toBeDefined();
                            expect(error.message).toBe(`token id \"${data.id}\" does not match user \"asd\"`)
                        })
                })
        )
    })
})