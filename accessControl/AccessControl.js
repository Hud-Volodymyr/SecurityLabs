'use strict';
const crypto = require('crypto');

class AccessControl {
    constructor(permissions, credentrials) {
        this.permissionsMap = permissions;
        this.credentialsMap = credentrials;
    }

    validate(username, password) {
        const user = this.credentialsMap.users[username]
        const isValid = user ? 
            user.password === crypto.createHash('sha256').update(password + user.secret).digest('hex') : false;
        if (user.timer < Date.now() + 432000000) { // if 5 days  passed
            user.secret = crypto.randomBytes(64).toString('hex');
            user.timer = Date.now();
            user.password = crypto.createHash('sha256').update(password + user.secret).digest('hex');
        }

        return isValid;
    }

    isAdmin(username) {
        return !!this.permissionsMap.admins.list[username]
    }

    addUser(username, password) {
        this.credentialsMap.users[username] = {}
        const user = this.credentialsMap.users[username];
        user.secret = crypto.randomBytes(64).toString('hex');
        user.password = crypto.createHash('sha256').update(password + user.secret).digest('hex');
        user.timer = Date.now();
        this.permissionsMap.users.list[username] = {
            A: 'REWACO',
            E: 'REWACO'
        };

        return {
            username: password,
            isAdmin: false
        }
    }

    addAdmin() {
        this.credentialsMap.users[username] = {}
        const user = this.credentialsMap.users[username];
        user.secret = crypto.randomBytes(64).toString('hex');
        user.password = crypto.createHash('sha256').update(password + user.secret).digest('hex');
        user.timer = Date.now();
        this.permissionsMap.admins.list[username] = {
            A: 'REWACO',
            B: 'REWACO',
            C: 'REWACO',
            D: 'REWACO',
            E: 'REWACO'
        };
        return {
            username: password,
            isAdmin : true
        }
    }

    checkUserAccess(username, file, rootPath, permission) {
        const access = this.permissionsMap.users.access;
        const list = this.permissionsMap.users.list;
        if (rootPath === '/') {
            return access.includes(file) && list[username][file].includes(permission);
        } else {
            const origin = rootPath[1];
            return access.includes(origin) && list[username][origin].includes(permission);
        }
    }

    deleteUser(username) {
        delete this.credentialsMap.users[username];
        delete this.permissionsMap.admins.list[username];
        delete this.permissionsMap.users.list[username];
        return true;
    }
}

module.exports = AccessControl;