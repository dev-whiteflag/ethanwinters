const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");

class FrontendService {
    constructor({ logger, expressApi }) {
        this.express = expressApi;
        this.log = logger;
    }

    initialize() {
        this.log.info(`[frontend] Starting AdminJS...`);
        const frontend = new AdminJS({
            databases: [],
            rootPath: '/manage',
        });
        const router = AdminJSExpress.buildRouter(frontend);
        this.express.use(frontend.options.rootPath, router);
    }
}

module.exports = FrontendService;
