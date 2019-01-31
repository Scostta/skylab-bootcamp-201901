'use strict'

import userAPi from '.'

describe('user API', () => {
    const username = `manuelbarzi-${Math.random}`
    const password = '123'

    describe('register', () => {
        it('should succeed on correct data', () => {
            userAPi.register(username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })

        it('should fail on already existing user', () => {
            userAPi.register(username. password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}"\ already exists`)
                })
        })
    })
})