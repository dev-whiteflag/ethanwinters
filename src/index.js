require('dotenv').config();
const express = require('express');
const DiscordClient = require('./config/client.discord');
const StartupService = require("./services/startup.service");
const Logger = require('./config/logger.pino');

const log = new Logger().get();
const app = express();
const port = process.env.EW_API_PORT;

const client = new DiscordClient().get();
const startupService = new StartupService({ discordClient: client, expressApi: app });

client.once('ready', () => {
    log.info('[main] Ethan Winters is Ready to Work.');
});

app.listen(port, () => {
    log.info(`[express] API listening on port ${port}.`)
});

startupService.start();

client.login(process.env.EW_DISCORD_TOKEN);
