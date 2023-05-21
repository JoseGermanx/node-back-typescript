"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bunyan_1 = __importDefault(require("bunyan"));
const log = bunyan_1.default.createLogger({ name: 'config' });
dotenv_1.default.config({});
class Config {
    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL || '';
        this.NODE_ENV = process.env.NODE_ENV || '';
        this.SERVER_PORT = process.env.SERVER_PORT || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
        this.JWT_TOKEN = process.env.JWT_TOKEN || '';
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    }
    validateConfig() {
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) {
                throw new Error(`The environment variable ${key} is missing`);
            }
        }
    }
}
exports.config = new Config();
//# sourceMappingURL=configEnvs.js.map