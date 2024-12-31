const fs = require('fs');
const path = require('path');

const loadCommands = (client, dir) => {
    const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const commandPath = path.join(dir, file);
        //console.log(`Loading command from: ${commandPath}`); 
        const command = require(commandPath);
        client.commands.set(command.name, command);
        //console.log(`Loaded command: ${command.name}`); 
    }
};

module.exports = loadCommands;