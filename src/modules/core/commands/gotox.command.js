const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require("@discordjs/builders");
const UberduckService = require("../services/uberduck.service");
const Logger = require('../services/logger.service');

const uberduck = new UberduckService({logger: new Logger().get()});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gotox')
        .setDescription('Fala o texto com a voz do Gotox.')
        .addStringOption(op =>
            op.setName('texto').setDescription('Texto a ser lido.').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const textoToBeRead = interaction.options.getString('texto');
        const uuid = await uberduck.generate('ibere', textoToBeRead);
        await wait(15000);
        let path = await uberduck.getStatus(uuid);
        return interaction.editReply(path);
    },
};
