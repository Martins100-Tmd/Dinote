"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const userId_1 = __importDefault(require("../middleware/userId"));
const delete_1 = require("../controller/delete");
exports.deleteRouter = express_1.default.Router();
exports.deleteRouter.delete('/onenote/:id', userId_1.default, delete_1.deleteNote);
exports.deleteRouter.delete('/onesect/:id', userId_1.default, delete_1.deleteSection);
exports.deleteRouter.delete('/onepage/:id', userId_1.default, delete_1.deletePage);
