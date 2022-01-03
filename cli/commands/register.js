'use strict';

const register = (context, username, password) => {
    if (context.validatePassword(password)) {
        console.log(`Invalid password!`);
        return;
    };

    if (context.isMaxUsers()) {
        console.log('Amount of users is at maximum');
        return;
    }

    const savedUser = context.createUser(username, password)

    if (!savedUser) {
        console.log('Failed to create new user!');
        return;
    }
    console.log('Success!');
}

module.exports = register;