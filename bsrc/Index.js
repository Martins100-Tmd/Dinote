"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const get_1 = require("./router/get");
const post_1 = require("./router/post");
const delete_1 = require("./router/delete");
const put_1 = require("./router/put");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json({ limit: '500mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/get', get_1.getRouter);
app.use('/post', post_1.postRouter);
app.use('/delete', delete_1.deleteRouter);
app.use('/put', put_1.putRouter);
app.listen(3001, () => {
    console.log('Listening on port  3001');
});
