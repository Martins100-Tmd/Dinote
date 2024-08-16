import cors from 'cors';
import express from 'express';
import { getAllUsers, getNoteSections, getUserNotes, routeAuth } from '../controller/get';
import userAuthMiddleWare from '../middleware/userId';

export const getRouter = express.Router();

getRouter.use(cors({ origin: '*' }));
getRouter.use(express.json({ limit: '500mb' }));
getRouter.use(express.urlencoded({ extended: true }));

getRouter.get('/users', getAllUsers);
getRouter.get('/userwithnote', userAuthMiddleWare, getUserNotes);
getRouter.get('/auth', userAuthMiddleWare, routeAuth);
getRouter.get('/section/:id', userAuthMiddleWare, getNoteSections);
