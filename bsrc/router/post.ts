import cors from 'cors';
import express from 'express';
import { authenticateUser, createANewNote, createANewPage, createANewSection, createANewUser } from '../controller/post';
import userAuthMiddleWare from '../middleware/userId';

export const postRouter = express.Router();

postRouter.use(cors({ origin: '*' }));
postRouter.use(express.json({ limit: '500mb' }));
postRouter.use(express.urlencoded({ extended: true }));

postRouter.post('/signup', createANewUser);
postRouter.post('/login', authenticateUser);
postRouter.post('/newnote', userAuthMiddleWare, createANewNote);
postRouter.post('/newsection', userAuthMiddleWare, createANewSection);
postRouter.post('/newpage', userAuthMiddleWare, createANewPage);
