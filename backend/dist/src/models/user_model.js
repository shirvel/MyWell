"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mainGoal: {
        type: String,
        required: true
    },
    specialDiets: {
        type: String,
        required: true
    },
    healthConditions: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: [String],
        required: false,
    },
    expiredTokens: {
        type: [String],
        required: false
    },
    imageUrl: {
        type: String,
    },
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user_model.js.map