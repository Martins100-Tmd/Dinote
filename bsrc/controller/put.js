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
exports.updateSectionName = exports.updatePageName = exports.updateAPage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//:PAGE
const updateAPage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, title, content, sectionId } = req.body;
        const id = req.params.id;
        if (userId) {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            const section = yield prisma.section.findUnique({ where: { id: sectionId } });
            if (user && section) {
                const updatePage = yield prisma.page.update({
                    where: { id },
                    data: {
                        title,
                        content,
                    },
                });
                if (updatePage)
                    res.status(200).json({ success: true, msg: 'Page successfully updated' });
                else
                    res.status(401).json({ success: false, msg: 'Error updating page' });
            }
            else
                res.status(401).json({
                    success: false,
                    msg: 'Make sure user and section are valid',
                });
        }
    });
};
exports.updateAPage = updateAPage;
const updatePageName = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, title } = req.body;
        const id = req.params.id;
        if (userId) {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            if (user) {
                const putPageName = yield prisma.page.update({
                    where: {
                        id,
                    },
                    data: {
                        title,
                    },
                });
                if (putPageName)
                    res.status(200).json({ success: true, msg: 'Page name updated!' });
                else
                    res.status(500).json({ success: false, msg: 'Error updating Page title' });
            }
            else
                res.status(404).json({ success: false, msg: 'User not found' });
        }
    });
};
exports.updatePageName = updatePageName;
const updateSectionName = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, title } = req.body;
        const id = req.params.id;
        if (userId) {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            if (user) {
                const putSectionName = yield prisma.section.update({
                    where: {
                        id,
                    },
                    data: {
                        title,
                    },
                });
                if (putSectionName)
                    res.status(200).json({ success: true, msg: 'Section name updated!' });
                else
                    res.status(500).json({ success: false, msg: 'Error updating Section title' });
            }
            else
                res.status(404).json({ success: false, msg: 'User not found' });
        }
    });
};
exports.updateSectionName = updateSectionName;
