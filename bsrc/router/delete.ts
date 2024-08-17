import cors from 'cors';
import express from 'express';
import userAuthMiddleWare from '../middleware/userId';
import { deleteNote } from '../controller/delete';

export const deleteRouter = express.Router();

deleteRouter.delete('/onenote/:id', userAuthMiddleWare, deleteNote);
