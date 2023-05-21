"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesServer = void 0;
// basic imports
const express_1 = require("express");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const compression_1 = __importDefault(require("compression"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const configEnvs_1 = require("../configs/configEnvs");
require("express-async-errors");
//--------
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const configLogs_1 = require("../configs/configLogs");
const log = configLogs_1.logger.createLogger('server');
class SalesServer {
    constructor(app) {
        this.app = app;
    }
    start() {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }
    securityMiddleware(app) {
        //Design pattern Synchronizer Token Pattern: https://medium.com/@kaviru.mihisara/synchronizer-token-pattern-e6b23f53518e
        app.use((0, cookie_session_1.default)({
            name: 'session',
            keys: [configEnvs_1.config.SECRET_KEY_ONE, configEnvs_1.config.SECRET_KEY_TWO],
            maxAge: 24 * 7 * 3600000,
            secure: configEnvs_1.config.NODE_ENV !== 'development'
        }));
        app.use((0, hpp_1.default)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)({
            origin: configEnvs_1.config.CLIENT_URL,
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
    }
    standardMiddleware(app) {
        app.use((0, compression_1.default)());
        app.use((0, express_1.json)({ limit: '50mb' }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    }
    routesMiddleware(app) {
        // applicationRoutes(app);
    }
    globalErrorHandler(app) {
        app.all('*', (req, res) => {
            log.error(`This url ${req.originalUrl} it is not found`);
            res.status(http_status_codes_1.default.NOT_FOUND).json({ message: `This url ${req.originalUrl} it is not found` });
        });
        // app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
        //   log.error(error);
        //   if (error instanceof CustomError) {
        //     return res.status(error.statusCode).json(error.serializeErrors());
        //   }
        //   next();
        // });
    }
    startServer(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const httpServer = new http_1.default.Server(app);
                // const socketIO: Server = await this.createSocketIO(httpServer);
                this.startHttpServer(httpServer);
                // this.socketIOConnections(socketIO);
            }
            catch (error) {
                log.error(error);
            }
        });
    }
    startHttpServer(httpServer) {
        log.info(`Server has started with process ${process.pid}.`);
        const PORT = Number(`${configEnvs_1.config.SERVER_PORT}`);
        httpServer.listen(PORT, () => {
            log.info(`Server running at ${PORT}.`);
        });
    }
}
exports.SalesServer = SalesServer;
// function applicationRoutes(app: Application) {
//   throw new Error('Function not implemented.');
// }
//# sourceMappingURL=setupServer.bootstrap.js.map