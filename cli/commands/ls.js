'use strict';

const path = require('path');
const fs   = require('fs');


const ls = (context, dir = '') => {
    if(!context.currentUser) {
        console.log('Login required')
        return;
    }
    const fullBasePath = path.join(context.basePath, context.workingDir);
    const fullPath = dir ? path.join(fullBasePath, dir) : fullBasePath;
    const relativePath = path.join(context.workingDir, dir);
    const listing = fs.readdirSync(fullPath);

    const files = listing.filter((file) => {
        if (context.isAdmin) return true;
        if (file === context.permissionsPath || file === context.credentialsPath) return;
        return context.accessControl.checkUserAccess(context.currentUser, file, relativePath, 'R');
    })
    
    console.log(files);
};

module.exports = ls;
