"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const weekly_reflection_controller_1 = __importDefault(require("../controllers/weekly_reflection_controller"));
router.post("/", weekly_reflection_controller_1.default.createfeedback);
router.get("/", weekly_reflection_controller_1.default.getAllfeedback);
exports.default = router;
//# sourceMappingURL=weekly_reflection_routers.js.map