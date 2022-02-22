class InitializeService {
    constructor({ logger, discordClient }) {
        this.log = logger;
        this.client = discordClient;
    }
}

module.exports = InitializeService;

