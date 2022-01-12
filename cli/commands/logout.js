'use strict';

const logout = (context) => {
    context.currentUser = null;

    console.log('Logged out!');
};

module.exports = logout;
