"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("./config/env");
const request_context_middleware_1 = require("./middlewares/request-context.middleware");
const routes_1 = require("./routes");
const error_middleware_1 = require("./middlewares/error.middleware");
function createApp() {
    const app = (0, express_1.default)();
    app.disable('x-powered-by');
    app.set('trust proxy', 1);
    const allowAll = env_1.env.corsOrigins.includes('*');
    app.use((0, cors_1.default)({
        origin: allowAll ? true : env_1.env.corsOrigins,
        credentials: !allowAll,
    }));
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
    app.use(express_1.default.json({ limit: '2mb' }));
    app.use(request_context_middleware_1.requestContext);
    app.use('/api', routes_1.routes);
    app.use(error_middleware_1.notFound);
    app.use(error_middleware_1.errorHandler);
    return app;
}
