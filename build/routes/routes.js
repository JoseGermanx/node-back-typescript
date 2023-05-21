"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserRouter {
    constructor() {
        this.expressRouter = (0, express_1.Router)();
        this.mountRoutes();
    }
    mountRoutes() {
        this.expressRouter.get('/sale', (req, res) => res.send('User: Jaime'));
        this.expressRouter.get('/sales', (req, res) => res.json([
            { username: 'jvillagran', active: true },
            { username: 'moleaga', active: false }
        ]));
        this.expressRouter.get('/detail', (req, res) => res.json({ username: 'jvillagran', active: true }));
        this.expressRouter.get('/delete', (req, res) => res.send('User deleted successfully'));
    }
}
exports.default = new UserRouter().expressRouter;
//# sourceMappingURL=routes.js.map