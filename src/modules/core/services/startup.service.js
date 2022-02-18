const Logger = require('./logger.service');
const CommandsDeployer = require("../commands.deployer");

class StartupService {
    constructor({ discordClient, expressApi }) {
        this.client = discordClient;
        this.express = expressApi;
        this.log = new Logger().get();
        this.commandDeployer = new CommandsDeployer({ discordClient });
    }

    start() {
       this.setupDiscordEvents();
       this.commandDeployer.register();
    }

    setupDiscordEvents() {
        this.log.info("Setting Discord Events...");
    }
}

module.exports = StartupService;
