"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const post_1 = require("../controller/post");
const userId_1 = __importDefault(require("../middleware/userId"));
exports.postRouter = express_1.default.Router();
exports.postRouter.use((0, cors_1.default)({ origin: '*' }));
exports.postRouter.use(express_1.default.json({ limit: '500mb' }));
exports.postRouter.use(express_1.default.urlencoded({ extended: true }));
exports.postRouter.post('/signup', post_1.createANewUser);
exports.postRouter.post('/login', post_1.authenticateUser);
exports.postRouter.post('/newnote', userId_1.default, post_1.createANewNote);
exports.postRouter.post('/newsection', userId_1.default, post_1.createANewSection);
exports.postRouter.post('/newpage', userId_1.default, post_1.createANewPage);
