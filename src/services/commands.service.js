const fs = require("fs");
const { Collection } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

class CommandsService {
    constructor({ logger, discordClient }) {
        this.log = logger;
        this.client = discordClient;
        this.client.commands = new Collection();
        this.absolutePath = './src/commands';
        this.relativePath = '../commands';
        this.commandFiles = this.retrieve();
        this.commandsJson = [];
    }

    register() {
        this.log.info('[cmds] Registering slash commands...');

        if (this.commandFiles.length === 0) {
            this.log.info(`[cmds] No slash command was found!`);
        } else {
            for (const file of this.commandFiles) {
                this.log.info(`[cmds] Registering ${file} slash command.`);
                const command = require(`${this.relativePath}/${file}`);
                this.client.commands.set(command.data.name, command);
                this.commandsJson.push(command.data.toJSON());
            }
            this.sendRest();
        }
    }

    sendRest() {
        const rest = new REST({ version: '9' }).setToken(process.env.EW_DISCORD_TOKEN);
        rest.put(Routes.applicationGuildCommands(process.env.EW_DISCORD_APP_ID, process.env.EW_DISCORD_APP_GUILD_ID),
            { body: this.commandsJson })
            .then(() => this.log.info('[cmds] Registered all slash commands successfully.'))
            .catch(this.log.error);
    }

    retrieve() {
        return fs.readdirSync(this.absolutePath).filter(file => file.endsWith('.js'));
    }
}

module.exports = CommandsService;

