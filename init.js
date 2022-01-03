#!/usr/bin/env node
'use strict';

const FileSystem = require('./fs/Filesystem');
const cli = require('./cli/commandLine');
const physicalDirPath = process.argv[2];


const main = () => {
  const fs = new FileSystem(physicalDirPath);
  cli.start(fs);
}

main();
