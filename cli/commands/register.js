'use strict';

const register = (context, username, password, isAdmin = 0) => {
    if (context.validatePassword(password)) {
        console.log(`Invalid password!`);
        return;
    };

    if (context.isMaxUsers()) {
        console.log('Amount of users is at maximum');
        return;
    }

    let savedUser = null;
    if (isAdmin) {
        savedUser = context.createAdmin(username, password)
    } else {
        savedUser = context.createUser(username, password)
    }

    if (!savedUser) {
        console.log('Failed to create new user!');
        return;
    }
    console.log('Success!');
}

module.exports = register;