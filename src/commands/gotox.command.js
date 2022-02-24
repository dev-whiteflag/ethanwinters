const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require("@discordjs/builders");
const UberduckService = require("../services/uberduck.service");
const Logger = require('../config/logger.pino');
const S3Service = require("../services/s3.service");
const FilesService = require("../services/files.service");

const logger = new Logger().get();
const uberduck = new UberduckService({ logger: logger });
const s3 = new S3Service({ logger: logger });
const file = new FilesService({ logger: logger });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gotox')
        .setDescription('Fala o texto com a voz do Gotox.')
        .addStringOption(op =>
            op.setName('texto').setDescription('Texto a ser lido.').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const textToBeRead = interaction.options.getString('texto').trim();
        const exists = s3.checkIfCacheExists(textToBeRead.replace(' ', '_'));
        let fileType = '.wav';
        let path;

        if (exists) {

        } else {
            const uuid = await uberduck.generate('rein-br', textToBeRead);
            await wait(15000); // maybe subscribe to that endpoint? (run every 5 sec)
            path = await uberduck.getStatus(uuid);
        }

        await interaction.channel.send({
            files: [{
                attachment: path,
                name: `${textToBeRead}${fileType}`
            }]
        });

        return interaction.editReply('Toma ai seu lixo.');
    },
};
