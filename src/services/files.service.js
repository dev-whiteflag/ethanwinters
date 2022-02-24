const fs = require("fs");
const http = require('http');
const { URL } = require("url");

class FilesService {
    constructor({ logger }) {
        this.log = logger;
    }

    download(path) {
        const parsedUrl = new URL(path);
        const file = fs.createWriteStream(`../../temp/download/${parsedUrl.pathname}`);
        const request = http.get(path, function(response) {
            response.pipe(file);
        });
        file.on('finish', () => file.close());
    }
}

module.exports = FilesService;
