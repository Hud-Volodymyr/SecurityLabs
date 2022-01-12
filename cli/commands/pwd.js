'use strict';

const pwd = (context) => {
    if(!context.currentUser) {
        console.log('Login required')
        return;
    }

    console.log(context.workingDir);
};

module.exports = pwd;