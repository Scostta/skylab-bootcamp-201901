logic = {
    Login(email, password, callback){

        login(email, password, callback){
            if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
    
            if(!email.trim().length) throw Error('email is empty')
    
            if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
    
            if(!password.trim().length) throw Error('password is empty')
    
            if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)
    
            var user = users.find(function(user){
               return user.email === email
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
}