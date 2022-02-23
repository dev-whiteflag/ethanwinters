const S3Client = require("../config/client.s3");

class S3Service {
    constructor({ logger }) {
        this.log = logger;
        this.client = new S3Client().get();
    }

    async checkIfCacheExists(fileName) {
        return this.client.listObjects({ Bucket: process.env.EW_S3_BUCKET }, function(err, data) {
            if (err) {
                this.log.error(err);
            } else {
                this.log.info(data.Contents);
            }
        });
    }

    async listarBuckets() {
        return this.client.listBuckets(function(err, data) {
            if (err) {
                this.log.error(err);
            } else {
                return data.Buckets;
            }
        });
    }
}

module.exports = S3Service;

