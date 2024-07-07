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
//import User from '../models/user_model';
const weekly_reflection_1 = __importDefault(require("../models/weekly_reflection"));
;
const createfeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body); // Add this log to check the request body
    const weekly_reflection = new weekly_reflection_1.default(req.body);
    try {
        yield weekly_reflection.save();
        console.log(`Created new weekly_reflection, ID: ${weekly_reflection._id}`);
        res.status(201).json(weekly_reflection);
    }
    catch (err) {
        const errorMessage = err.message;
        res.status(500).json({ error: "fail: " + errorMessage });
    }
});
const getAllfeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const weekly_reflections = yield weekly_reflection_1.default.find();
    try {
        res.status(200).json(weekly_reflections);
    }
    catch (err) {
        console.error('Error getting weekly_reflections:', err);
        res.status(500).json({ error: 'An error occurred while fetching weekly_reflections' });
    }
});
exports.default = { createfeedback, getAllfeedback };
//# sourceMappingURL=weekly_reflection_controller.js.map