"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const weekly_reflection_routers_1 = __importDefault(require("./routes/weekly_reflection_routers"));
const meal_planner_route_1 = __importDefault(require("./routes/meal_planner_route"));
const initApp = () => {
    const promise = new Promise((resolve) => {
        mongoose_1.default.connect(process.env.DATABASE_URL);
        const db = mongoose_1.default.connection;
        db.on('error', (error) => {
            console.error('Connection error:', error);
        });
        db.once('open', () => {
            console.log('Connected to MongoDB');
            const app = (0, express_1.default)();
            app.use((0, cors_1.default)());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use(body_parser_1.default.json());
            app.use((req, res, next) => {
                console.log('Middleware Request Headers:', req.headers);
                console.log('Middleware Request Body:', req.body);
                next();
            });
            app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "*");
                res.header("Access-Control-Allow-Headers", "*");
                next();
            });
            app.use("/api/weekly_reflection", weekly_reflection_routers_1.default);
            app.use("/api/planner", meal_planner_route_1.default);
            resolve(app);
        });
    });
    return promise;
};
exports.initApp = initApp;
//# sourceMappingURL=app.js.map