import cors from 'cors';
import express from 'express';
import userAuthMiddleWare from '../middleware/userId';
import { deleteNote, deletePage, deleteSection } from '../controller/delete';
import bodyParser from 'body-parser';

export const deleteRouter = express.Router();

deleteRouter.use(
   cors({
      origin: '*',
      credentials: true,
      methods: ['DELETE'],
   })
);
deleteRouter.use(bodyParser.json({ limit: '500mb' }));
deleteRouter.use(bodyParser.urlencoded({ extended: true }));
deleteRouter.delete('/onenote/:id', userAuthMiddleWare, deleteNote);
deleteRouter.delete('/onesect/:id', userAuthMiddleWare, deleteSection);
deleteRouter.delete('/onepage/:id', userAuthMiddleWare, deletePage);
