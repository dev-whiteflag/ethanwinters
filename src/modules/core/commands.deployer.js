const fs = require("fs");
const {Collection} = require("discord.js");

class CommandsDeployer {
    constructor({ logger, discordClient }) {
        this.log = logger;
        this.client = discordClient;
        this.client.commands = new Collection();
        this.commandFiles = this.retrieve();
    }

    register() {
        this.log.info('Registering slash commands...');
        for (const file of this.commandFiles) {
            this.log.debug(`Registering ${file} slash command...`);
            const command = require(`./commands/${file}`);
            this.client.commands.set(command.name, command);
        }
    }

    retrieve() {
        return fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    }
}

module.exports = CommandsDeployer;

