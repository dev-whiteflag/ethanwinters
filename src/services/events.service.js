const fs = require("fs");

class EventsService {
    constructor({ logger, discordClient }) {
        this.log = logger;
        this.client = discordClient;
        this.absolutePath = './src/events';
        this.relativePath = '../events';
        this.eventFiles = this.retrieve();
    }

    register() {
        this.log.info('[events] Registering events...');
        for (const file of this.eventFiles) {
            this.log.info(`[events] Registering ${file} event.`);
            const event = require(`${this.relativePath}/${file}`);
            event.bind(this.client);
        }
    }

    retrieve() {
        return fs.readdirSync(this.absolutePath).filter(file => file.endsWith('.js'));
    }
}

module.exports = EventsService;

