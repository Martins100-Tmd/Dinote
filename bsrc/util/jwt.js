"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '/env') });
const JWT_SECRET = process.env.JWT_SECRET;
function JWT(id) {
    const token = jsonwebtoken_1.default.sign({ userId: id }, JWT_SECRET !== null && JWT_SECRET !== void 0 ? JWT_SECRET : 'ABCXXX00', { expiresIn: '1d' });
    return token;
}
exports.JWT = JWT;
