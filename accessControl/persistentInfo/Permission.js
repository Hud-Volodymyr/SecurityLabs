'use strict';

class Permission {
    constructor(username, permissions) {
        this.username = username;
        this.permissions = permissions;
    }

    toJson() {
        return `{"username":"${this.username}","permissions":${JSON.stringify(this.permissions)}"}`
    }
}

module.exports = Permission;
