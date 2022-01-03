'use strict';

class AccessControl {
    constructor(permissions, credentrials) {
        this.permissionsMap = permissions;
        this.credentialsMap = credentrials;
    }

    validate(username, password) {
        return this.permissionsMap[username] === password;
    }

    addUser(username, password) {
        this.credentialsMap[username] = password;

    }

    addAdmin() {
        this.credentialsMap[username] = password;


    }
}

module.exports = AccessControl;