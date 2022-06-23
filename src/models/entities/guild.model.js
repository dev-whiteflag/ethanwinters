const mongoose = require('mongoose');

const GuildModel = mongoose.model('Guild', {
    id: String, appId: String
});

module.exports = GuildModel;