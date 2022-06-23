const fs = require("fs");

module.exports = {
    async bind(client) {
        client.on('messageCreate', async message => {
            if (message.content.startsWith('!ew')) {
                const absolutePath = './src/commands';
                const relativePath = '../commands';
                const command = message.content.split(' ')[1];
                const path = `${absolutePath}/${command}.command.js`;

                if (fs.existsSync(path)) {
                    const clazz = require(`${relativePath}/${command}.command`);
                    clazz.run(message);
                } else {
                    message.reply('tem esse comando n ow esquisofrenico');
                }
            }
        });
    },
};
