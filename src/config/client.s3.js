const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.EW_S3_REGION });

class S3Client {
    constructor() {
        if (!S3Client.instance) {
            S3Client.instance = new AWS.S3({ apiVersion: '2006-03-01' });
        }
    }

    get() {
        return S3Client.instance;
    }
}

module.exports = S3Client;
