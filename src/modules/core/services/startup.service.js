const Logger = require('./logger.service');
const CommandsService = require("./commands.service");
const EventsService = require("./events.service");

class StartupService {
    constructor({ discordClient, expressApi }) {
        this.client = discordClient;
        this.express = expressApi;
        this.log = new Logger().get();
        this.commandService = new CommandsService({ logger: this.log, discordClient: this.client });
        this.eventService  = new EventsService({ logger: this.log, discordClient: this.client });
    }

    start() {
       this.commandService.register();
       this.eventService.register();
    }
}

module.exports = StartupService;
