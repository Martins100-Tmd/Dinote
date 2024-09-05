"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../util/jwt");
const JWT_SECRET = process.env.JWT_SECRET || 'ABCXXX123';
const userAuthMiddleWare = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        res.status(403).json({ success: false, msg: 'Token authentication failed!' });
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            req.body.userId = decoded.userId;
            next();
        }
        catch (err) {
            if (err.message == 'Token Error jwt expired') {
                let tkn = (0, jwt_1.JWT)(req.body.userId);
                req.headers.authorization = 'Bearer ' + tkn;
                res.status(200).json({ message: 'Token Expired', token: tkn });
            }
        }
    }
};
exports.default = userAuthMiddleWare;
