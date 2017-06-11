const dispatcher = require('../dispatcher/AppDispatcher');


export function createUser(username, email, password){
    dispatcher.dispatch({
        type: "SIGN_UP",
        username,
        email,
        password
    })

}




