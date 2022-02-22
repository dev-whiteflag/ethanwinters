const fs = require("fs");

class EventsService {
    constructor({ logger, discordClient }) {
        this.log = logger;
        this.client = discordClient;
        this.absolutePath = './src/modules/core/events';
        this.relativePath = '../events';
        this.eventFiles = this.retrieve();
    }

    register() {
        this.log.info('Registering events...');
        for (const file of this.eventFiles) {
            this.log.info(`Registering ${file} event...`);
            const event = require(`${this.relativePath}/${file}`);
            event.bind(this.client);
        }
    }

    retrieve() {
        return fs.readdirSync(this.absolutePath).filter(file => file.endsWith('.js'));
    }
}

module.exports = EventsService;

