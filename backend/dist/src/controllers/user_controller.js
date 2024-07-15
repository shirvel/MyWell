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
const user_model_1 = __importDefault(require("../models/user_model"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
const getUserByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ name: req.params.name });
        res.send(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        res.send(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
const putUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user;
        if (req.body.email) {
            user = yield user_model_1.default.findOneAndUpdate({ _id: req.params.id }, { email: req.body.email, name: req.body.name }, { new: true } // To return the updated document
            );
        }
        res.status(204).json({ message: user });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deleteUserById");
    try {
        const user = yield user_model_1.default.findByIdAndDelete(req.params.id);
        res.send(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.default = { getAllUsers, getUserById, putUserById, deleteUserById, getUserByName };
//# sourceMappingURL=user_controller.js.map