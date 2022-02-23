class Logger {
    constructor() {
        if (!Logger.instance) {
            Logger.instance = require('pino')({
                level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
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
