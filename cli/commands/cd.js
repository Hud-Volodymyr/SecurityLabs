'use strict';

const fs   = require('fs');
const path = require('path');

const cd = (context, dirPath) => {
    if(!context.currentUser) {
        console.log('Login required')
        return;
    }
    const fullDirPath = path.join(context.basePath, context.workingDir, dirPath);

    if (fs.existsSync(fullDirPath) && fs.lstatSync(fullDirPath).isDirectory()) {
        if (!fullDirPath.includes(context.basePath)) {
            console.log(`${dirPath}: no such directory`);
        }
        if (!context.isAdmin) {
            if (context) { // TODO : put condition here
                context.workingDir = fullDirPath.replace(context.basePath, '');
            } else {
                console.log('Access denied');
            }
        } else {
            context.workingDir = fullDirPath.replace(context.basePath, '');
        };
        
    } else {
        console.log(`${dirPath}: no such directory`);
    }
};

module.exports = cd;
