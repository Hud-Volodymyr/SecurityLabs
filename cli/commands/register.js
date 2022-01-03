'use strict';

const register = (context, username, password) => {
    if (password.length !== context.password.length) {
        console.log(`Password has to be of length ${context.password.length}!`);
        return;
    };

    if (context.isMaxUsers()) {
        console.log('Amount of users is at maximum');
        return;
    }

    const savedUser = context.createUser(username, password)
}