const { Client, Intents } = require('discord.js');

class DiscordClient {
    constructor() {
        if (!DiscordClient.instance) {
            DiscordClient.instance = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]});
        }
    }

    get() {
        return DiscordClient.instance;
    }
}

module.exports = DiscordClient;
