'use strict'

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    toJson() {
        return `{"username":"${username}","password":"${password}"}`;
    }
}

module.exports = Credentials;