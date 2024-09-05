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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePage = exports.deleteSection = exports.deleteNote = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deleteNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const id = req.params.id;
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            const delNote = yield prisma.note.delete({
                where: {
                    id,
                },
            });
            if (delNote) {
                res.status(200).json({ success: true, msg: `Note: ${delNote.title} deleted!` });
            }
            else
                res.status(400).json({ success: false, msg: `Error deleting Note` });
        }
        else
            res.status(403).json({ success: false, msg: 'Unauthorized User!' });
    });
};
exports.deleteNote = deleteNote;
const deleteSection = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const id = req.params.id;
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            const delSection = yield prisma.section.delete({
                where: { id },
            });
            if (delSection) {
                res.status(200).json({ success: true, msg: `Section: ${delSection.title} deleted!` });
            }
            else
                res.status(400).json({ success: false, msg: `Error deleting Section` });
        }
        else
            res.status(403).json({ success: false, msg: 'Unauthorized User!' });
    });
};
exports.deleteSection = deleteSection;
const deletePage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const id = req.params.id;
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            const delPage = yield prisma.page.delete({ where: { id } });
            if (delPage) {
                res.status(200).json({ success: true, msg: `Page: ${delPage.title} deleted!` });
            }
            else
                res.status(400).json({ success: false, msg: `Error deleting Page` });
        }
        else
            res.status(403).json({ success: false, msg: 'Unauthorized User!' });
    });
};
exports.deletePage = deletePage;
