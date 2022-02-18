const CommandTemplate = require("../command.template");

class GotoxCommand extends CommandTemplate {
    constructor() {
        const name = 'gotox';
        const desc = 'Lê o texto com a voz do Gotox.';
        super(name, desc, null);
    }
}
