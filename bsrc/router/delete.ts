import cors from 'cors';
import express from 'express';
import userAuthMiddleWare from '../middleware/userId';
import { deleteNote, deletePage, deleteSection } from '../controller/delete';

export const deleteRouter = express.Router();

deleteRouter.delete('/onenote/:id', userAuthMiddleWare, deleteNote);
deleteRouter.delete('/onesect/:id', userAuthMiddleWare, deleteSection);
deleteRouter.delete('/onepage/:id', userAuthMiddleWare, deletePage);
