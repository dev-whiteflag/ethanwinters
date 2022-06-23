const mongoose = require('mongoose');

const GuildModel = mongoose.model('Guild', {
    guildId: String, appId: String
});

module.exports = GuildModel;