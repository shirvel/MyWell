"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
(0, app_1.initApp)().then((app) => {
    console.log('development');
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, { cors: {
            origin: '*',
        } });
    /* Start listening for both app requests and docket requests */
    const port = 3000;
    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
//# sourceMappingURL=server.js.map