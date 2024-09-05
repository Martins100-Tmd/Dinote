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
exports.getPage = exports.getSectionPages = exports.getNoteSections = exports.routeAuth = exports.getUserWithNote = exports.getUserNotes = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllUsers = yield prisma.user.findMany();
        if (getAllUsers)
            res.status(200).json({ data: getAllUsers });
    });
};
exports.getAllUsers = getAllUsers;
//:user note
const getUserNotes = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getNotes = yield prisma.note.findMany();
        if (getNotes) {
            res.status(200).json({ getNotes });
        }
    });
};
exports.getUserNotes = getUserNotes;
//:user with notes
const getUserWithNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const authUser = userId && prisma.user.findUnique({ where: { id: userId } });
        if (authUser) {
            const getUserWithNote = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    notes: { where: { userId } },
                },
            });
            if (getUserWithNote) {
                res.status(200).json({ getUserWithNote });
            }
            else
                res.status(400).json({ success: false, msg: 'Operation failed!' });
        }
    });
};
exports.getUserWithNote = getUserWithNote;
const routeAuth = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        if (userId) {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            if (user) {
                res.status(200).json({ success: true, message: 'allow user' });
            }
            else {
                res.status(400).json({ success: false, message: 'dont allow user' });
            }
        }
    });
};
exports.routeAuth = routeAuth;
const getNoteSections = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        let id = req.params.id, Section;
        if (userId && id) {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            const note = yield prisma.note.findUnique({ where: { id } });
            if (user && note) {
                Section = yield prisma.section.findMany({
                    where: {
                        noteId: id,
                    },
                });
            }
            if (Section)
                res.status(200).json({ success: true, data: Section });
            else
                res.status(400).json({ success: false, msg: 'Failed to get section' });
        }
        else
            res.status(400).json({ success: false, msg: 'make sure note id is correct and exist' });
    });
};
exports.getNoteSections = getNoteSections;
const getSectionPages = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        let id = req.params.id, Pages;
        if (userId && id) {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            const section = yield prisma.section.findUnique({ where: { id } });
            if (user && section) {
                Pages = yield prisma.page.findMany({
                    where: {
                        sectionId: id,
                    },
                });
            }
            if (Pages)
                res.status(200).json({ success: true, data: Pages });
            else
                res.status(400).json({ success: false, msg: 'Failed to get pages' });
        }
        else
            res.status(400).json({ success: false, msg: 'make sure note id is correct and exist' });
    });
};
exports.getSectionPages = getSectionPages;
const getPage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let [{ userId }, pageId] = [req.body, req.params.id];
        if (userId && pageId) {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            if (user) {
                const onePage = yield prisma.page.findUnique({ where: { id: pageId } });
                if (onePage)
                    console.log(onePage), res.status(200).json({ success: true, data: onePage });
                else
                    res.status(400).json({ success: false, msg: 'Error getting page' });
            }
            else
                res.status(404).json({ success: false, msg: 'User not found' });
        }
    });
};
exports.getPage = getPage;
