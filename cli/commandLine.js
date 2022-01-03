'use strict';

const readline = require('readline');
const cliCommands = require('./commands/index.js');

module.exports = {
  start: (fs) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
    });
    
    rl.prompt();
    
    rl.on('line', (line) => {
      const commands = {
        ...cliCommands,
        help: () => {
          console.log('Commands:', Object.keys(commands).join(', '));
        },
        hello: () => {
          console.log('Hello there!');
        },
        exit: () => {
          rl.close();
        }
      }
      let args;
      line = line.trim();
      line = line.split(' ');
      [ line, ...args ] = line;;
      const command = commands[line];
      try {
        if (command) command(fs.context, ...args);
        else console.log('Unknown command');
        rl.prompt();
      } catch (error) {
        if (error.message) console.log(error.message);
        else console.log(error);
      }
    }).on('close', () => {
      fs.exit();
      console.log('Bye!');
      process.exit(0);
    });
  }
}
