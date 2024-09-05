"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRouter = void 0;
const express_1 = __importDefault(require("express"));
const userId_1 = __importDefault(require("../middleware/userId"));
const put_1 = require("../controller/put");
exports.putRouter = express_1.default.Router();
exports.putRouter.put('/onenote/:id', userId_1.default);
exports.putRouter.put('/onesect/:id', userId_1.default);
exports.putRouter.put('/onepage/:id', userId_1.default, put_1.updateAPage);
exports.putRouter.put('/pagename/:id', userId_1.default, put_1.updatePageName);
exports.putRouter.put('/sectname/:id', userId_1.default, put_1.updateSectionName);
