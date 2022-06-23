const Logger = require("../config/logger.pino");

module.exports = {
    async run(snowflake) {
        this.log = new Logger().get();
        snowflake.reply('aranha tem polem?');
    }
}