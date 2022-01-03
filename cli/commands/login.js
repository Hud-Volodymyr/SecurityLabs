'use strict';

const login = (context, username, password) => {
    const accessControl = context.accessControl;
    const isValidUser = accessControl.validate(username, password)
    if (!isValidUser) throw new Error('User does not exist');

    console.log('Success!');
};

module.exports = login;
