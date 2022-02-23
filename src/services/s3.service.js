const S3Client = require("../config/client.s3");

class S3Service {
    constructor({ logger }) {
        this.log = logger;
        this.client = new S3Client().get();
    }

    async initialize() {
        this.log.info('[s3] Initializing S3 Service...')
        const exists = await this.checkIfBucketExists();

        if (!exists) {
            this.log.warn(`[s3] Bucket is missing from Region ${process.env.EW_S3_REGION}.`);
            await this.createBucket();
        }
    }

    async createBucket() {
        await this.client.createBucket({ Bucket: process.env.EW_S3_BUCKET }, function (err, data) {
            if (err) {
                this.log.error(`[s3] Error when creating Bucket: ${err.name}`);
            } else {
                this.log.info(`[s3] Bucket ${process.env.EW_S3_BUCKET} created.`);
            }
        }).promise();
    }

    checkIfCacheExists(fileName) {
        return this.client.listObjects({ Bucket: process.env.EW_S3_BUCKET }, function(err, data) {
            if (err) {
                this.log.error(err);
            } else {
                this.log.info(data.Contents);
            }
        });
    }

     async checkIfBucketExists() {
         const res = await this.client.listBuckets(function (err, data) {
             if (err) {
                 this.log.error(`[s3] Error when checking if Bucket exists: ${err.name}`);
             } else {
                 return data.Buckets;
             }
         }).promise();
         return res.Buckets.find(bucket => bucket.Name === process.env.EW_S3_BUCKET) !== undefined;
     }
}

module.exports = S3Service;

