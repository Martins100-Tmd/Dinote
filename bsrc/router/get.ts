import cors from 'cors';
import express from 'express';
import { getAllUsers, getNoteSections, getPage, getSearchPages, getSectionPages, getUserWithNote, routeAuth } from '../controller/get';
import userAuthMiddleWare from '../middleware/userId';

export const getRouter = express.Router();

getRouter.use(cors({ origin: '*' }));

getRouter.use(express.json({ limit: '500mb' }));
getRouter.use(express.urlencoded({ extended: true }));

getRouter.get('/users', getAllUsers);
getRouter.get('/userwithnote', userAuthMiddleWare, getUserWithNote);
getRouter.get('/auth', userAuthMiddleWare, routeAuth);
getRouter.get('/section/:id', userAuthMiddleWare, getNoteSections);
getRouter.get('/page/:id', userAuthMiddleWare, getSectionPages);
getRouter.get('/getpage/:id', userAuthMiddleWare, getPage);
getRouter.get('/searchpages', userAuthMiddleWare, getSearchPages);
