'use strict';

const login = (context, username, password) => {
    if (context.currentUser) {
        console.log('Already logged in');
        return;
    }
    const accessControl = context.accessControl;
    const isValidUser = accessControl.validate(username, password)
    if (!isValidUser) {
        console.log('User does not exist');
        return;
    }
    context.currentUser = username;
    context.isAdmin     = accessControl.isAdmin(username)

    console.log('Success!');
};

module.exports = login;
