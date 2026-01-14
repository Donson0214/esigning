"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
(0, server_1.startServer)().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
});
