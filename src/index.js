require('dotenv').config();
const express = require('express');
const DiscordClient = require('./modules/core/client.discord');
const StartupService = require("./modules/core/services/startup.service");
const Logger = require('./modules/core/services/logger.service');

const log = new Logger().get();
const app = express();
const port = process.env.EW_API_PORT;

const client = new DiscordClient().get();
const startupService = new StartupService({ discordClient: client, expressApi: app });

client.once('ready', () => {
    log.info('BOT is Ready to Work.');
});

app.listen(port, () => {
    log.info(`API listening on port ${port}.`)
});

startupService.start();

client.login(process.env.EW_DISCORD_TOKEN);
