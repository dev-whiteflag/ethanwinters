const axios = require('axios')

class UberduckService {
    constructor({ logger }) {
        this.log = logger;
        this.authConfig = {
            username: process.env.EW_UBERDUCK_KEY,
            password: process.env.EW_UBERDUCK_SECRET
        }
    }

    async generate(voice, text) {
        return axios.post('https://api.uberduck.ai/speak', {
            speech: text,
            voice: voice
        }, {
            auth: this.authConfig
        }).then(res => {
            return res.data.uuid;
        }).catch(err => {
            this.log.error(err);
        });
    }

    async getStatus(uuid) {
        return axios.get(`https://api.uberduck.ai/speak-status?uuid=${uuid}`, {
            auth: this.authConfig
        }).then(res => {
            return res.data.path;
        }).catch(err => {
            this.log.error(err);
        });
    }
}

module.exports = UberduckService;
