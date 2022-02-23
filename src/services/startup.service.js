const Logger = require('../config/logger.pino');
const CommandsService = require("./commands.service");
const EventsService = require("./events.service");
const S3Service = require("./s3.service");

class StartupService {
    constructor({ discordClient, expressApi }) {
        this.client = discordClient;
        this.express = expressApi;
        this.log = new Logger().get();
        this.commandService = new CommandsService({ logger: this.log, discordClient: this.client });
        this.eventService = new EventsService({ logger: this.log, discordClient: this.client });
        this.s3Service = new S3Service({ logger: this.log });
    }

    start() {
        this.s3Service.initialize().then(() => this.log.info('[s3] S3 Service initialized successfully.'));
        this.commandService.register();
        this.eventService.register();
    }
}

module.exports = StartupService;
