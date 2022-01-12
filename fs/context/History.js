const fs = require('fs');
const path = require('path');

class History {
    constructor(historyPath) {
        this.commands = [];
        this.historyPath = historyPath;
    }

    save(basePath) {
        fs.appendFileSync(path.join(basePath, this.historyPath), this.format());
    }

    add(command) {
        this.commands.push(command)
    }

    format() {
        let string = '';
        for (const command of this.commands) {
            string += command;
        }
        return string
    }
}

module.exports = History;