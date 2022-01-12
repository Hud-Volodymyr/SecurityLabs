'use strict';

const readline = require('readline');
const cliCommands = require('./commands/index.js');
const { promisify } = require('util');


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

const questions = {
  '10': 'Whats your name?',
  'Volodymyr': 'How old are you?'
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});
const question = promisify((s, cb) => rl.question(s, a => cb(null, a)));
class Command {
  async execute(command, context, args) {
    if (['register', 'login', 'help', 'exit', 'hello', 'logout'].includes(command)) {
      this.time = Date.now();
      commands[command](context, ...args);
    } else {
      if (this.time && this.time < Date.now() - 1000 * 120) { // every 2 minutes
        const tries = 1;
        const questionKeys = Object.keys(questions)
        const index = Math.floor(Math.random()*questionKeys.length);
        const question = questions[questionKeys[index]]
        await this.ask(context, question, questionKeys, index, tries)   
        this.time = Date.now()     
      }
      commands[command](context, ...args);
    }
  }

  async ask(context, qLine, questionKeys, index, tries) {
    const answer = await question(qLine + '\n>');
    if (answer && answer === questionKeys[index]) {
      console.log('Success!');
      return;
    } else {
      if (tries) {
        tries -= 1
        console.log('Try again!')
        await this.ask(context, qLine, questionKeys, index, tries)
      } else {
        if (!context.isAdmin) {
          const ok = context.deleteUser(context.currentUser);
          if (ok) {
            console.log('User deleted. Please ask admin to restore.')
          }
        }
        commands.logout(context);
        return;
      }
    }
  }
}

module.exports = {
  start: (fs) => {    
    rl.prompt();
    const command = new Command(); 
    
    rl.on('line', (line) => {
      let args;
      line = line.trim();
      line = line.split(' ');
      [ line, ...args ] = line;
      try {
        if (commands[line]) command.execute(line, fs.context, args);
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
