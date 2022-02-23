const { Client, Intents } = require('discord.js');

class DiscordClient {
    constructor() {
        if (!DiscordClient.instance) {
            DiscordClient.instance = new Client({intents: [Intents.FLAGS.GUILDS]});
        }
    }

    get() {
        return DiscordClient.instance;
    }
}

module.exports = DiscordClient;
