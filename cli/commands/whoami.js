'use strict';

const whoami = (context) => {
    if(!context.currentUser) {
        console.log('Please log in');
        return;
    }

    console.log(context.currentUser);
};

module.exports = whoami;
