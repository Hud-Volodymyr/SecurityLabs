'use strict';

const AccessControl = require("../../accessControl/AccessControl");
const fs = require('fs');
const path = require('path');
const permissionsPath = '.permissions.json';
const credentialsPath = '.credentials.json';

class Context {
  constructor() {
    const permissions = this._getPermissions(permissionsPath);
    const credentials = this._getCredentials(credentialsPath);
    this.accessControl = new AccessControl(permissions, credentials);
    this.password = {
      length: 3,
      expireTime: 259200000 // 3 days
    }
    this.maxUsers = 5;
  }

  save(permissions, credentials) {
    fs.writeFileSync(permissions, this.accessControl.permissionsMap.toJson());
    fs.writeFileSync(credentials, this.accessControl.credentialsMap.toJson());
  }

  _getPermissions(permissionsPath) {
    if (fs.existsSync(permissionsPath)) return JSON.parse(fs.readFileSync(path.join(this.BASE_PATH, permissionsPath)));
    return '{}';
  }

  _getCredentials(credentialsPath) {
    if(fs.existsSync(credentialsPath)) return JSON.parse(fs.readFileSync(path.join(this.BASE_PATH, credentialsPath)));
    return '{}';
  }

  isMaxUsers() {
    return this.accessControl.credentialsMap.length === this.maxUsers;
  }

  saveUser(username, password) {
    this.accessControl.addUser(username, password);
  }
}

module.exports = Context;