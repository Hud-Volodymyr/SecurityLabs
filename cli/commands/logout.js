'use strict';

const logout = (context) => {
    context.currentUser = null;

    console.log('Success!');
};

module.exports = logout;
