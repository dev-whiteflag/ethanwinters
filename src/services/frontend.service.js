const fs = require("fs");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require('@adminjs/mongoose');
const mongoose = require('mongoose');

class FrontendService {
    constructor({ logger, expressApi }) {
        this.express = expressApi;
        this.log = logger;
        this.absolutePath = './src/models/entities';
        this.relativePath = '../models/entities';
        this.files = this.retrieve();
        this.entities = [];
    }

    registerResources() {
        this.log.info(`[frontend] Registering Entity Classes...`);
        if (this.files.length !== 0) {
            for (const file of this.files) {
                this.log.info(`[frontend] Registering ${file}.`);
                const model = require(`${this.relativePath}/${file}`);
                this.entities.push(model);
            }
        }
        this.registerRouter();
    }

    registerRouter() {
        AdminJS.registerAdapter(AdminJSMongoose);

        mongoose.connect(process.env.EW_DB_URL, { useNewUrlParser: true }).then((db) => {
            this.log.info(`[frontend] Connected to database!`);
            const frontend = new AdminJS({
                databases: [db],
                resources: this.entities,
                rootPath: '/manage',
                branding: {
                    companyName: 'Ethan Winters Dashboard',
                }
            });

            const router = AdminJSExpress.buildRouter(frontend);
            this.express.use(frontend.options.rootPath, router);
            this.log.info(`[frontend] Finished registering adapter!`);
        });
    }

    retrieve() {
        return fs.readdirSync(this.absolutePath).filter(file => file.endsWith('.js'));
    }
}

module.exports = FrontendService;
