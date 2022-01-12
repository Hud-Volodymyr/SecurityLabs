'use strict'
const path = require('path');
const fs = require('fs');
const Context = require('./context/Context');

const userDirs = ['A', 'B', 'C', 'D', 'E'];
const permissionsPath = '.permissions.json';
const credentialsPath = '.credentials.json';
const historyPath = '.history';

class FileSystem {
  constructor(physicalBasePath = '../TESTDIR') {
    this.BASE_PATH = this._basePath(physicalBasePath);
    //const inotify = new InotifyWrapper({ target: monitoredFilepath });
    
    this._createRootDir();
    this._createUserDirs();
    this.context = new Context(this.BASE_PATH, permissionsPath, credentialsPath, historyPath);
  }

  exit() {
    console.log(`\n${this.constructor.name} is exiting...`);
    this._saveContext();
    return
  }

  _saveContext() {
    this.context.save();
  }

  _basePath(physicalBasePath) {
    return path.isAbsolute(physicalBasePath) ? physicalBasePath : path.join(__dirname, physicalBasePath);
  }

  _createRootDir() {
    if (!fs.existsSync(this.BASE_PATH)) {
      this._mkdir(this.BASE_PATH);
      return false;
    } else {
      const dir = fs.readdirSync(this.BASE_PATH);
      if (dir.length !== 0) {
        dir.forEach(file => {
          if (file === permissionsPath || file === credentialsPath || file === historyPath) return;
          if (!userDirs.includes(file)) throw new Error(`Directory ${this.BASE_PATH} is not empty`);
        })
      }
      fs.chmodSync(this.BASE_PATH, '0700');
      return true;
    }
  }

  _createUserDirs() {
    const dir = fs.readdirSync(this.BASE_PATH);

    if (dir.length !== 0) return;
    userDirs.forEach((dir) => {
      this._mkdir(path.join(this.BASE_PATH, dir));
    });
  }

  _mkdir(path) {
    fs.mkdirSync(path, {
      mode: '0700'
    });
  }
}

module.exports = FileSystem;