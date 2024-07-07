"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const weeklyReflectionSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true
    },
    feeling: {
        type: String,
        required: true,
    },
    pastWeek: {
        type: String,
        required: true,
    },
    feedbackOnWeeklyPlan: {
        type: String,
        required: true,
    },
    //createdAt: {
    //type: Date,
    //default: Date.now,
    //}
});
exports.default = mongoose_1.default.model('weeklyReflection', weeklyReflectionSchema);
//# sourceMappingURL=weekly_reflection.js.map