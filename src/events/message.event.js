const fs = require("fs");

module.exports = {
    async bind(client) {
        client.on('messageCreate', async message => {
            if (message.content.startsWith('!ew')) {
                const relativePath = '../commands';
                const command = message.content.split(' ')[1];
                const path = `${relativePath}/${command}.command.js`;

                if (fs.existsSync(path)) {
                    const clazz = require(path);
                    clazz.run(message);
                } else {
                    message.reply('tem esse comando n ow esquisofrenico');
                }
            }
        });
    },
};
