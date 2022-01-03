'use strict';

class AccessControl {
    constructor(permissions, credentrials) {
        this.permissionsMap = permissions;
        this.credentialsMap = credentrials;
    }

    validate(username, password) {
        return this.credentialsMap[username] === password;
    }

    addUser(username, password) {
        this.credentialsMap[username] = password;
        this.permissionsMap.users.list.push(username);

        return {
            username: password,
            isAdmin: false
        }
    }

    addAdmin() {
        this.credentialsMap[username] = password;

        this.permissionsMap.admins.list.push(username);
        return {
            username: password,
            isAdmin : true
        }
    }
}

module.exports = AccessControl;