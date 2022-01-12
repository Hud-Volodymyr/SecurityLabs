'use strict';

const login    = require('./login');
const logout   = require('./logout');
const register = require('./register');
const whoami   = require('./whoami');
const ls       = require('./ls');
const cd       = require('./cd');
const pwd      = require('./pwd');


module.exports = {
    login,
    register,
    logout,
    whoami,
    ls,
    cd,
    pwd
};
