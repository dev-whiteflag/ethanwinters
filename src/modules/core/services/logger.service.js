class Logger {
    constructor() {
        if (!Logger.instance) {
            Logger.instance = require('pino')({
                transport: {
                    target: 'pino-pretty'
                },
            });
        }
    }

    get() {
        return Logger.instance;
    }
}

module.exports = Logger;
