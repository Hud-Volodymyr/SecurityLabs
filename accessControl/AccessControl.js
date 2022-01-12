'use strict';

class AccessControl {
    constructor(permissions, credentrials) {
        this.permissionsMap = permissions;
        this.credentialsMap = credentrials;
    }

    validate(username, password) {
        return this.credentialsMap[username] === password;
    }

    isAdmin(username) {
        return !!this.permissionsMap.admins.list[username]
    }

    addUser(username, password) {
        this.credentialsMap[username] = password;
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
        this.credentialsMap[username] = password;

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
        delete this.credentialsMap[username];
        delete this.permissionsMap.admins.list[username];
        return true;
    }
}

module.exports = AccessControl;