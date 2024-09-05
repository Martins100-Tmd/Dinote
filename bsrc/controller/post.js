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
exports.createANewPage = exports.authenticateUser = exports.createANewSection = exports.createANewNote = exports.createANewUser = void 0;
const client_1 = require("@prisma/client");
const jwt_1 = require("../util/jwt");
const color_1 = require("../util/color");
const prisma = new client_1.PrismaClient();
//:SIGNUP
const createANewUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        const checkRedundantCreation = yield prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (checkRedundantCreation) {
            res.status(403).json({ success: false, msg: 'User already exist' });
        }
        else {
            const createUser = yield prisma.user.create({
                data: { username, email, password },
            });
            if (createUser) {
                res.status(200).json({ success: true, message: 'User created!!', token: (0, jwt_1.JWT)(createUser.id) });
            }
        }
    });
};
exports.createANewUser = createANewUser;
//:NOTE
const createANewNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { userId, title } = req.body;
        const createNote = yield prisma.note.create({
            data: {
                title,
                color: color_1.color,
                userId,
            },
        });
        if (createNote) {
            res.status(200).json({ message: 'New Note successfully created!', success: true });
        }
        else {
            res.status(400).json({ message: 'Note creation unsuccessful', success: false });
        }
    });
};
exports.createANewNote = createANewNote;
//:SECTION
const createANewSection = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, noteId } = req.body;
        const createSection = yield prisma.section.create({
            data: {
                title,
                color: '#282828',
                noteId,
            },
        });
        if (createSection) {
            res.status(200).json({ createSection });
        }
    });
};
exports.createANewSection = createANewSection;
//:LOGIN
const authenticateUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        let userHasAccount, token;
        if (email && password) {
            userHasAccount = yield prisma.user.findUnique({
                where: {
                    email,
                    password,
                },
            });
            token = (0, jwt_1.JWT)((userHasAccount === null || userHasAccount === void 0 ? void 0 : userHasAccount.id) || '');
        }
        if (userHasAccount)
            res.status(200).json({ success: true, info: userHasAccount, token });
        else
            res.status(400).json({ success: false, msg: 'Bad request' });
    });
};
exports.authenticateUser = authenticateUser;
//:PAGE
const createANewPage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, title, content, sectionId } = req.body;
        if (userId) {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            const section = yield prisma.section.findUnique({ where: { id: sectionId } });
            if (user && section) {
                const createPage = yield prisma.page.create({
                    data: { title, content, sectionId },
                });
                if (createPage)
                    res.status(201).json({ success: true, msg: `Note (${createPage.title}):${createPage.id}`, id: createPage.id });
                else
                    res.status(400).json({ success: false, msg: 'Unable to create page' });
            }
            else
                res.status(403).json({ success: false, msg: 'section or user does not exist' });
        }
    });
};
exports.createANewPage = createANewPage;
