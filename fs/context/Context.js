'use strict';
const crypto = require('crypto');

const AccessControl = require("../../accessControl/AccessControl");
const fs = require('fs');
const path = require('path');
const History = require('./History');

class Context {
  constructor(physicalBasePath, permissionsPath, credentialsPath, historyPath) {
    this.basePath = physicalBasePath;
    this.permissionsPath = permissionsPath;
    this.credentialsPath = credentialsPath;
    this.historyPath = historyPath;
    const permissions = this._getPermissions();
    const credentials = this._getCredentials();
    this.accessControl = new AccessControl(permissions, credentials);
    this.history = new History(historyPath);
    this.password = {
      length: 3,
      expireTime: 259200000 // 3 days
    }
    this.maxUsers = 5;
    this.currentUser = null;
    this.isAdmin = false;
    this.workingDir = '/';
  }

  save() {
    fs.writeFileSync(path.join(this.basePath, this.permissionsPath), JSON.stringify(this.accessControl.permissionsMap));
    fs.writeFileSync(path.join(this.basePath, this.credentialsPath), JSON.stringify(this.accessControl.credentialsMap));
    this._saveHistory();
  }

  _saveHistory() {
    this.history.save(this.basePath);
  }

  _getPermissions() {
    const permPath = path.join(this.basePath, this.permissionsPath);
    if (fs.existsSync(permPath)) return JSON.parse(fs.readFileSync(permPath));
    return {
      users: {
        access: [ 'A', 'E' ],
        list: {}
      },
      admins: {
        access: [ 'A', 'B', 'C', 'D', 'E'],
        list: {}
      }
    };
  }

  _getCredentials() {
    const credPath = path.join(this.basePath, this.credentialsPath)
    if(fs.existsSync(credPath)) return JSON.parse(fs.readFileSync(credPath));
    return { users: {} };
  }

  isMaxUsers() {
    return Object.keys(this.accessControl.credentialsMap).length === this.maxUsers;
  }

  createUser(username, password) {
    const user = this.accessControl.addUser(username, password);
    return user;
  }

  createAdmin(username, password) {
    const admin = this.accessControl.addAdmin(username, password);
    return admin;
  }

  validatePassword(password) {
    return password.length !== this.password.length;
  }

  deleteUser(username) {
    const status = this.accessControl.deleteUser(username);
    return status;
  }
}

module.exports = Context;